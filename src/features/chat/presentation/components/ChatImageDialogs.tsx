import { Action, ChatIcon, colors, IconTile, Notice, surfaceShadow } from "@/components/chat-ui";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatImageView } from "./ChatImageView";

interface PreviewProps {
  uri: string;
  sending: boolean;
  error: string | null;
  onCancel: () => void;
  onSend: () => void;
}

export function ChatImagePreview({ uri, sending, error, onCancel, onSend }: PreviewProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const { height } = useWindowDimensions();
  const failed = status === "failed";
  return (
    <Modal transparent visible animationType="fade" onRequestClose={onCancel}>
      <SafeAreaView style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.card} accessibilityViewIsModal>
            <View style={styles.cardHead}>
              <IconTile name="photo" accent />
              <Text accessibilityRole="header" style={styles.title}>Enviar foto</Text>
            </View>
            <View style={[styles.preview, { maxHeight: Math.max(90, height * 0.44) }]}>
              <Image source={uri} style={StyleSheet.absoluteFill} contentFit="contain"
                onLoad={() => setStatus("ready")} onError={() => setStatus("failed")}
                accessibilityLabel="Vista previa de la imagen seleccionada" />
              {status === "loading" && <ActivityIndicator color={colors.purple} accessibilityLabel="Cargando vista previa" />}
            </View>
            {(failed || error) && <Notice>{failed ? "No se pudo abrir esta imagen. Selecciona otra." : error}</Notice>}
            <View style={styles.actions}>
              <Action label="Cancelar" variant="quiet" onPress={onCancel} disabled={sending} />
              <Action label={sending ? "Enviando…" : error ? "Reintentar" : "Enviar foto"}
                icon="send" busy={sending} disabled={status !== "ready"} onPress={onSend} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export function ChatImageViewer({ path, onClose }: { path: string; onClose: () => void }) {
  return (
    <Modal visible animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.viewer}>
        <View style={styles.viewerBar}>
          <Text accessibilityRole="header" style={styles.viewerTitle}>Foto del chat</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Cerrar foto" onPress={onClose}
            style={({ pressed }) => [styles.close, pressed && styles.pressed]}>
            <ChatIcon name="close" color={colors.white} size={21} />
          </Pressable>
        </View>
        <ChatImageView path={path} expanded />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "#170F27B8" },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 18 },
  card: { ...surfaceShadow, width: "100%", maxWidth: 460, alignSelf: "center", padding: 16,
    borderRadius: 24, backgroundColor: colors.white, gap: 14 },
  cardHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  title: { flex: 1, color: colors.ink, fontSize: 23, fontWeight: "900", letterSpacing: -0.45 },
  preview: { width: "100%", aspectRatio: 4 / 3, backgroundColor: colors.lavender, borderRadius: 17,
    overflow: "hidden", alignItems: "center", justifyContent: "center" },
  actions: { flexDirection: "row", justifyContent: "flex-end", flexWrap: "wrap", gap: 8 },
  viewer: { flex: 1, backgroundColor: colors.night, paddingHorizontal: 12, paddingBottom: 12 },
  viewerBar: { flexDirection: "row", alignItems: "center", gap: 12, padding: 8 },
  viewerTitle: { flex: 1, fontWeight: "800", color: colors.white, fontSize: 17 },
  close: { width: 44, height: 44, alignItems: "center", justifyContent: "center", backgroundColor: colors.plum, borderRadius: 14 },
  pressed: { opacity: 0.7 },
});
