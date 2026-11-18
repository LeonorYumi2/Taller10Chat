import { Action, ChatIcon, colors, EmptyState, IconTile, NightBackdrop, Notice, surfaceShadow } from "@/components/chat-ui";
import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { Room } from "@features/chat/domain/entities/Message";
import { useRooms } from "@features/chat/presentation/hooks/useRooms";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomsScreen() {
  const { rooms, isLoading, error, createRoom, isCreating, createError } = useRooms();
  const { logout } = useAuth();
  const username = useAuthStore((state) => state.user?.username);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");

  function handleCreate() {
    if (!roomName.trim() || isCreating) return;
    createRoom(roomName.trim(), {
      onSuccess: () => {
        setRoomName("");
        setModalVisible(false);
      },
    });
  }

  const closeDialog = () => setModalVisible(false);

  function renderRoom({ item }: { item: Room }) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={item.name}
        onPress={() => router.push({ pathname: "/chat/[roomId]", params: { roomId: item.id, roomName: item.name } })}
        style={({ pressed }) => [styles.room, pressed && styles.pressed]}>
        <IconTile name="hashtag" />
        <View style={styles.roomText}>
          <Text style={styles.roomName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.meta}>Creada el {item.createdAt.toLocaleDateString()}</Text>
        </View>
        <ChatIcon name="chevron" color={colors.purple} size={18} />
      </Pressable>
    );
  }

  return (
    <NightBackdrop>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <View style={styles.hero}>
          <View style={styles.top}>
            <View style={styles.brand}><IconTile name="chat" accent /><Text style={styles.brandText}>Mi Chat</Text></View>
            <Pressable accessibilityRole="button" accessibilityLabel="Cerrar sesión" onPress={logout}
              style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
              <ChatIcon name="logout" color={colors.white} size={19} /><Text style={styles.logoutText}>Salir</Text>
            </Pressable>
          </View>
          <Text accessibilityRole="header" style={styles.title}>Conversaciones</Text>
          {!!username && <Text style={styles.greeting} numberOfLines={2}>Hola, {username}</Text>}
        </View>
        <SafeAreaView edges={["bottom"]} style={styles.sheet}>
          <FlatList keyboardShouldPersistTaps="handled" style={styles.list} contentContainerStyle={styles.listContent}
            data={rooms} keyExtractor={(room) => room.id} renderItem={renderRoom}
            ListHeaderComponent={
              <View style={styles.toolbar}>
                <Text accessibilityRole="header" style={styles.sectionTitle}>Salas</Text>
                <Action label="Nueva sala" icon="add" variant="accent" onPress={() => setModalVisible(true)} />
              </View>
            }
            ListEmptyComponent={isLoading ? (
              <View style={styles.loading}><ActivityIndicator color={colors.purple} /><Text style={styles.meta}>Cargando salas…</Text></View>
            ) : error ? <Notice>No se pudieron cargar las salas.</Notice> : (
              <EmptyState icon="hashtag" title="Todavía no hay salas" description="Crea una sala para empezar a conversar." />
            )}
          />
        </SafeAreaView>
      </SafeAreaView>
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeDialog}>
        <SafeAreaView style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} accessible={false} onPress={closeDialog} />
          <KeyboardAvoidingView pointerEvents="box-none" style={styles.dialogArea} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.dialogScroll} pointerEvents="box-none">
              <View style={styles.dialog} accessibilityViewIsModal>
                <IconTile name="hashtag" accent />
                <Text accessibilityRole="header" style={styles.sectionTitle}>Nueva sala</Text>
                {!!createError && <Notice>{createError}</Notice>}
                <TextInput accessibilityLabel="Nombre de la sala" style={styles.input} placeholder="Nombre de la sala"
                  placeholderTextColor={colors.muted} value={roomName} onChangeText={setRoomName}
                  autoFocus maxLength={50} returnKeyType="done" onSubmitEditing={handleCreate} />
                <View style={styles.actions}>
                  <Action label="Cancelar" variant="quiet" onPress={closeDialog} />
                  <Action label="Crear sala" icon="add" busy={isCreating} disabled={!roomName.trim()} onPress={handleCreate} />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </NightBackdrop>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  hero: { width: "100%", maxWidth: 760, alignSelf: "center", padding: 20, paddingBottom: 24, gap: 8 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 12 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 },
  brandText: { color: colors.white, fontSize: 18, fontWeight: "800", flexShrink: 1 },
  logout: { flexDirection: "row", alignItems: "center", minHeight: 44, paddingHorizontal: 12, gap: 6, borderRadius: 14, backgroundColor: "#FFFFFF17" },
  logoutText: { color: colors.white, fontWeight: "700" },
  title: { color: colors.white, fontSize: 39, letterSpacing: -1.5, fontWeight: "900" },
  greeting: { color: colors.pale, fontSize: 16 },
  sheet: { flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: colors.paper, overflow: "hidden" },
  list: { flex: 1, width: "100%", maxWidth: 760, alignSelf: "center" },
  listContent: { padding: 18, gap: 10 },
  toolbar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
  sectionTitle: { color: colors.ink, fontSize: 24, fontWeight: "900", letterSpacing: -0.55 },
  room: { ...surfaceShadow, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderWidth: 1,
    borderColor: colors.line, padding: 13, borderRadius: 20 },
  roomText: { flex: 1, minWidth: 0, gap: 3 },
  roomName: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  meta: { color: colors.muted, fontSize: 13 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
  loading: { alignItems: "center", padding: 28, gap: 10 },
  overlay: { flex: 1, backgroundColor: "#190F2BB3" },
  dialogArea: { flex: 1, width: "100%", maxWidth: 480, alignSelf: "center" },
  dialogScroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
  dialog: { ...surfaceShadow, backgroundColor: colors.white, borderRadius: 24, padding: 20, gap: 14 },
  input: { borderColor: colors.line, borderWidth: 1, borderRadius: 14, minHeight: 50, padding: 13, color: colors.ink, backgroundColor: colors.paper, fontSize: 16 },
  actions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: 8 },
});
