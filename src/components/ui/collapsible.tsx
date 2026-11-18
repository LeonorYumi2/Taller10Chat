import { ChatIcon, colors } from "@/components/chat-ui";
import { type PropsWithChildren, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, ReduceMotion } from "react-native-reanimated";

const reveal = FadeIn.duration(180).reduceMotion(ReduceMotion.System);

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.card}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: isOpen }}
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <Text style={styles.title}>{title}</Text>
        <View style={isOpen && styles.openIcon}><ChatIcon name="chevron" color={colors.purple} size={18} /></View>
      </Pressable>
      {isOpen && <Animated.View entering={reveal} style={styles.content}>{children}</Animated.View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, overflow: "hidden" },
  heading: { flexDirection: "row", minHeight: 50, padding: 12, alignItems: "center", gap: 8 },
  title: { flex: 1, color: colors.ink, fontWeight: "800", fontSize: 15 },
  openIcon: { transform: [{ rotate: "90deg" }] },
  pressedHeading: { backgroundColor: colors.lavender },
  content: { gap: 10, padding: 12, backgroundColor: colors.lavender },
});
