import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { type ComponentProps, type ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

export const colors = {
  ink: "#211833", muted: "#625970", night: "#1B142C", plum: "#382454",
  purple: "#582E96", lavender: "#EEE8F9", paper: "#F7F4FB", white: "#FFFFFF",
  line: "#E3DAEE", lime: "#DAF779", pale: "#DAD0E8", error: "#8D284A", errorBg: "#FDEBF1",
};

const icons = {
  chat: { ios: "bubble.left.and.bubble.right.fill", android: "forum", web: "forum" },
  hashtag: { ios: "number", android: "tag", web: "tag" },
  email: { ios: "envelope", android: "mail", web: "mail" },
  user: { ios: "person", android: "person", web: "person" },
  lock: { ios: "lock", android: "lock", web: "lock" },
  eye: { ios: "eye", android: "visibility", web: "visibility" },
  eyeOff: { ios: "eye.slash", android: "visibility_off", web: "visibility_off" },
  next: { ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" },
  chevron: { ios: "chevron.right", android: "chevron_right", web: "chevron_right" },
  back: { ios: "chevron.left", android: "chevron_left", web: "chevron_left" },
  add: { ios: "plus", android: "add", web: "add" },
  logout: { ios: "rectangle.portrait.and.arrow.right", android: "logout", web: "logout" },
  attach: { ios: "paperclip", android: "attach_file", web: "attach_file" },
  send: { ios: "paperplane.fill", android: "send", web: "send" },
  photo: { ios: "photo", android: "image", web: "image" },
  close: { ios: "xmark", android: "close", web: "close" },
  alert: { ios: "exclamationmark.circle", android: "error_outline", web: "error_outline" },
  docs: { ios: "book", android: "menu_book", web: "menu_book" },
} satisfies Record<string, ComponentProps<typeof SymbolView>["name"]>;

export type ChatIconName = keyof typeof icons;

export function ChatIcon({ name, color = colors.ink, size = 22 }: { name: ChatIconName; color?: string; size?: number }) {
  return <SymbolView name={icons[name]} tintColor={color} size={size} style={{ width: size, height: size }} />;
}

export function NightBackdrop({ children, compact = false }: { children?: ReactNode; compact?: boolean }) {
  return (
    <LinearGradient colors={[colors.night, colors.plum]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.backdrop, compact && styles.compact]}>
      <View pointerEvents="none" style={styles.orbit} />
      <View pointerEvents="none" style={[styles.orbit, styles.innerOrbit]} />
      {children}
    </LinearGradient>
  );
}

export function IconTile({ name, accent = false }: { name: ChatIconName; accent?: boolean }) {
  return <View style={[styles.tile, accent && styles.accentTile]}><ChatIcon name={name} color={accent ? colors.ink : colors.purple} /></View>;
}

type ActionProps = {
  label: string; onPress: () => void; icon?: ChatIconName; busy?: boolean; disabled?: boolean;
  variant?: "primary" | "accent" | "quiet";
};

export function Action({ label, onPress, icon, busy, disabled, variant = "primary" }: ActionProps) {
  const foreground = variant === "primary" ? colors.white : colors.ink;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ busy, disabled: disabled || busy }}
      onPress={onPress} disabled={disabled || busy}
      style={({ pressed }) => [styles.action, styles[variant], (disabled || busy) && styles.disabled, pressed && styles.pressed]}>
      {busy ? <ActivityIndicator size="small" color={foreground} /> : icon && <ChatIcon size={19} name={icon} color={foreground} />}
      <Text style={[styles.actionLabel, { color: foreground }]}>{label}</Text>
    </Pressable>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <View style={styles.notice}><ChatIcon name="alert" size={18} color={colors.error} /><Text accessibilityLiveRegion="polite" style={styles.noticeText}>{children}</Text></View>;
}

export function EmptyState({ icon = "chat", title, description }: { icon?: ChatIconName; title: string; description: string }) {
  return <View style={styles.empty}><IconTile name={icon} /><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{description}</Text></View>;
}

export const surfaceShadow = {
  elevation: 3, shadowColor: colors.plum, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 14,
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, overflow: "hidden" },
  compact: { flex: 0 },
  orbit: { position: "absolute", width: 270, height: 270, right: -120, top: -95, borderWidth: 1, borderColor: "#FFFFFF27", borderRadius: 150 },
  innerOrbit: { width: 192, height: 192, right: -81, top: -56 },
  tile: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.lavender, alignItems: "center", justifyContent: "center" },
  accentTile: { backgroundColor: colors.lime },
  action: { minHeight: 50, paddingVertical: 10, paddingHorizontal: 16, gap: 8, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 15 },
  actionLabel: { fontWeight: "800", fontSize: 15, flexShrink: 1, textAlign: "center" },
  primary: { backgroundColor: colors.purple },
  accent: { backgroundColor: colors.lime },
  quiet: { backgroundColor: colors.lavender },
  disabled: { opacity: 0.65 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  notice: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, borderRadius: 14, backgroundColor: colors.errorBg },
  noticeText: { flex: 1, color: colors.error, fontSize: 14, lineHeight: 20 },
  empty: { alignItems: "center", justifyContent: "center", padding: 24, gap: 12 },
  emptyTitle: { color: colors.ink, fontSize: 22, fontWeight: "800", textAlign: "center" },
  emptyBody: { color: colors.muted, fontSize: 15, lineHeight: 21, textAlign: "center", maxWidth: 280 },
});
