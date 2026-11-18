import { Action, ChatIcon, type ChatIconName, colors, IconTile, NightBackdrop, Notice, surfaceShadow } from "@/components/chat-ui";
import { StatusBar } from "expo-status-bar";
import { type ReactNode, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import Animated, { FadeInDown, ReduceMotion } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const intro = FadeInDown.duration(240).reduceMotion(ReduceMotion.System);

type FormProps = {
  title: string; description: string; action: string; onSubmit: () => void;
  busy: boolean; error: string | null; footer: ReactNode; children: ReactNode;
};

export function AuthForm({ title, description, action, onSubmit, busy, error, footer, children }: FormProps) {
  return (
    <NightBackdrop>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
            <View style={styles.content}>
              <View style={styles.brand}>
                <IconTile name="chat" accent />
                <Text style={styles.wordmark}>Mi Chat</Text>
              </View>
              <Animated.View entering={intro} style={styles.head}>
                <Text accessibilityRole="header" style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
              </Animated.View>
              <View style={styles.card}>
                {error && <Notice>{error}</Notice>}
                {children}
                <Action label={action} icon="next" busy={busy} onPress={onSubmit} />
              </View>
              <View style={styles.footer}>{footer}</View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NightBackdrop>
  );
}

export function AuthField({ label, icon, password = false, ...input }: TextInputProps & {
  label: string; icon: ChatIconName; password?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  const toggleLabel = revealed ? "Ocultar contraseña" : "Mostrar contraseña";

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputShell, focused && styles.focus]}>
        <ChatIcon name={icon} color={colors.purple} size={19} />
        <TextInput
          {...input}
          accessibilityLabel={label}
          placeholderTextColor={colors.muted}
          selectionColor={colors.purple}
          secureTextEntry={password && !revealed}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {password && (
          <Pressable accessibilityRole="button" accessibilityLabel={toggleLabel} accessibilityState={{ expanded: revealed }}
            onPress={() => setRevealed((value) => !value)} style={({ pressed }) => [styles.eye, pressed && styles.eyePressed]}>
            <ChatIcon name={revealed ? "eyeOff" : "eye"} color={colors.purple} size={22} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export const authCopy = StyleSheet.create({
  footer: { color: colors.pale, fontSize: 15, textAlign: "center", lineHeight: 25 },
  link: { color: colors.lime, fontWeight: "800", textDecorationLine: "underline" },
});

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 22 },
  content: { width: "100%", maxWidth: 470, alignSelf: "center", gap: 20 },
  brand: { flexDirection: "row", alignItems: "center", gap: 12 },
  wordmark: { color: colors.white, fontSize: 21, fontWeight: "800" },
  head: { gap: 8 },
  title: { fontSize: 43, fontWeight: "900", letterSpacing: -1.8, color: colors.white },
  description: { color: colors.pale, fontSize: 16, lineHeight: 23, maxWidth: 360 },
  card: { ...surfaceShadow, backgroundColor: colors.white, borderRadius: 26, padding: 18, gap: 15 },
  footer: { alignItems: "center", paddingBottom: 4 },
  field: { gap: 6 },
  label: { color: colors.ink, fontWeight: "800", fontSize: 14 },
  inputShell: { flexDirection: "row", alignItems: "center", minHeight: 54, paddingLeft: 13, paddingRight: 5, gap: 9,
    backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 15 },
  focus: { borderColor: colors.purple, backgroundColor: colors.white },
  input: { flex: 1, minWidth: 0, alignSelf: "stretch", color: colors.ink, fontSize: 16, paddingVertical: 10, paddingRight: 6 },
  eye: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 12 },
  eyePressed: { backgroundColor: colors.lavender },
});
