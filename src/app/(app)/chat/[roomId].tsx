import { ChatIcon, colors, EmptyState, IconTile, NightBackdrop, Notice, surfaceShadow } from "@/components/chat-ui";
import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { Message } from "@features/chat/domain/entities/Message";
import { ChatImagePreview, ChatImageViewer } from "@features/chat/presentation/components/ChatImageDialogs";
import { ChatImageView } from "@features/chat/presentation/components/ChatImageView";
import { useChat } from "@features/chat/presentation/hooks/useChat";
import { ImagePreview, pickChatImage } from "@features/chat/presentation/pickChatImage";
import { ChatError } from "@shared/domain/errors/AppError";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform,
  Pressable, StyleSheet, Text, TextInput, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const { roomId, roomName } = useLocalSearchParams<{ roomId: string; roomName?: string }>();
  const router = useRouter();
  const { messages, textMutation, imageMutation, isPending, isError, refetch } = useChat(roomId);
  const user = useAuthStore((s) => s.user);
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const [viewer, setViewer] = useState<string | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const pickingLock = useRef(false);
  const sendingImageLock = useRef(false);
  const sendingTextLock = useRef(false);
  const listRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (!messages.length) return;
    const frame = requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    return () => cancelAnimationFrame(frame);
  }, [messages.length]);

  async function handleSend() {
    if (!input.trim() || sendingTextLock.current) return;
    const draft = input;
    sendingTextLock.current = true;
    try {
      await textMutation.mutateAsync(draft.trim());
      setInput((current) => current === draft ? "" : current);
    } catch {
      // El error se muestra junto al campo y se conserva el borrador.
    } finally {
      sendingTextLock.current = false;
    }
  }

  async function handleAttach() {
    if (pickingLock.current) return;
    pickingLock.current = true;
    setPicking(true);
    setAttachmentError(null);
    Keyboard.dismiss();
    try {
      setPreview(await pickChatImage());
    } catch (error) {
      setAttachmentError(error instanceof ChatError ? error.message :
        "No se pudo abrir la galería. Revisa el acceso a tus fotos e inténtalo de nuevo.");
    } finally {
      pickingLock.current = false;
      setPicking(false);
    }
  }

  function cancelPreview() {
    if (sendingImageLock.current) return;
    setPreview(null);
    imageMutation.reset();
  }

  async function confirmImage() {
    if (!preview || sendingImageLock.current) return;
    sendingImageLock.current = true;
    try {
      await imageMutation.mutateAsync(preview);
      setPreview(null);
      imageMutation.reset();
    } catch {
      // Mantener la selección permite reintentar con la misma ruta.
    } finally {
      sendingImageLock.current = false;
    }
  }

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwn = item.userId === user?.id;
    const path = item.imagePath;
    return (
      <View style={[styles.row, isOwn && styles.rowOwn]}>
        <View style={[styles.bubble, isOwn ? styles.own : styles.other]}>
          {!isOwn && !!item.authorUsername && <Text style={styles.author}>{item.authorUsername}</Text>}
          {path ? (
            <ChatImageView path={path} onOpen={() => setViewer(path)} />
          ) : (
            <Text style={[styles.text, isOwn && styles.textOwn]}>{item.content}</Text>
          )}
          <Text style={[styles.time, isOwn && styles.timeOwn]}>
            {item.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <NightBackdrop compact>
          <SafeAreaView edges={["top", "left", "right"]}>
            <View style={styles.headerRow}>
              <Pressable accessibilityRole="button" accessibilityLabel="Volver a salas"
                onPress={() => router.canGoBack() ? router.back() : router.replace("/(app)")}
                style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
                <ChatIcon name="back" color={colors.white} size={20} />
              </Pressable>
              <IconTile name="hashtag" accent />
              <Text accessibilityRole="header" numberOfLines={2} style={styles.headerTitle}>{roomName || "Conversación"}</Text>
            </View>
          </SafeAreaView>
        </NightBackdrop>
      </View>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={renderMessage}
        keyboardShouldPersistTaps="handled"
        style={styles.thread}
        contentContainerStyle={[styles.list, !messages.length && styles.emptyList]}
        ListEmptyComponent={isPending ? (
          <View style={styles.loading}><ActivityIndicator color={colors.purple} /><Text style={styles.loadingText}>Cargando conversación…</Text></View>
        ) : isError ? null : (
          <EmptyState title="Aquí empieza la conversación" description="Escribe un mensaje o comparte una foto." />
        )}
      />
      {isError && (
        <Pressable style={styles.historyError} accessibilityRole="button" onPress={() => void refetch()}>
          <Notice>No se pudo cargar el chat. Toca para reintentar.</Notice>
        </Pressable>
      )}
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.composer}>
        {!!attachmentError && <View style={styles.composerNotice}><Notice>{attachmentError}</Notice></View>}
        {textMutation.isError && (
          <View style={styles.composerNotice}><Notice>No se pudo enviar el mensaje. Intenta de nuevo.</Notice></View>
        )}
        <View style={styles.inputRow}>
          <Pressable
            style={({ pressed }) => [styles.action, styles.attach, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Adjuntar imagen"
            disabled={picking || !user || !roomId}
            onPress={handleAttach}
          >
            {picking ? <ActivityIndicator color={colors.purple} /> : <ChatIcon name="attach" color={colors.purple} />}
          </Pressable>
          <TextInput
            accessibilityLabel="Mensaje"
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Escribe un mensaje…"
            placeholderTextColor={colors.muted}
            multiline
            maxLength={500}
          />
          <Pressable
            style={({ pressed }) => [styles.action, styles.send, (!input.trim() || !user) && styles.disabled, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Enviar mensaje"
            disabled={!input.trim() || textMutation.isPending || !user || !roomId}
            onPress={handleSend}
          >
            {textMutation.isPending ? <ActivityIndicator color={colors.ink} /> : <ChatIcon name="send" size={22} />}
          </Pressable>
        </View>
      </SafeAreaView>
      {preview && (
        <ChatImagePreview
          key={preview.id}
          uri={preview.uri}
          sending={imageMutation.isPending}
          error={imageMutation.isError ? imageMutation.error instanceof ChatError
            ? imageMutation.error.message : "No se pudo enviar la imagen. Intenta de nuevo." : null}
          onCancel={cancelPreview}
          onSend={confirmImage}
        />
      )}
      {viewer && <ChatImageViewer path={viewer} onClose={() => setViewer(null)} />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  header: { backgroundColor: colors.night },
  headerRow: { width: "100%", maxWidth: 760, alignSelf: "center", flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  headerTitle: { flex: 1, minWidth: 0, color: colors.white, fontSize: 22, fontWeight: "900", letterSpacing: -0.35 },
  back: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#FFFFFF19", alignItems: "center", justifyContent: "center" },
  thread: { flex: 1, width: "100%", maxWidth: 760, alignSelf: "center" },
  list: { paddingHorizontal: 16, paddingVertical: 18 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
  row: { flexDirection: "row", marginVertical: 5 },
  rowOwn: { justifyContent: "flex-end" },
  bubble: { ...surfaceShadow, maxWidth: "82%", borderRadius: 20, paddingVertical: 9, paddingHorizontal: 12, minWidth: 62 },
  own: { backgroundColor: colors.purple, borderBottomRightRadius: 6 },
  other: { backgroundColor: colors.white, borderBottomLeftRadius: 6, borderWidth: 1, borderColor: colors.line },
  author: { fontSize: 12, fontWeight: "800", color: colors.purple, marginBottom: 5 },
  text: { fontSize: 16, lineHeight: 22, color: colors.ink },
  textOwn: { color: colors.white },
  time: { fontSize: 11, color: colors.muted, marginTop: 5, alignSelf: "flex-end" },
  timeOwn: { color: colors.lavender },
  composer: { backgroundColor: colors.white, borderTopWidth: 1, borderColor: colors.line },
  inputRow: { width: "100%", maxWidth: 760, alignSelf: "center", flexDirection: "row", alignItems: "flex-end", padding: 12, gap: 8 },
  input: {
    flex: 1, minWidth: 0, minHeight: 48, maxHeight: 110, borderWidth: 1, borderColor: colors.line,
    borderRadius: 17, paddingHorizontal: 13, paddingVertical: 11, backgroundColor: colors.paper, color: colors.ink, fontSize: 16,
  },
  action: { width: 48, height: 48, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  attach: { backgroundColor: colors.lavender },
  send: { backgroundColor: colors.lime },
  disabled: { opacity: 0.58 },
  pressed: { opacity: 0.74, transform: [{ scale: 0.96 }] },
  loading: { alignItems: "center", gap: 10 },
  loadingText: { color: colors.muted },
  historyError: { paddingHorizontal: 12, paddingBottom: 8 },
  composerNotice: { paddingHorizontal: 12, paddingTop: 8 },
});
