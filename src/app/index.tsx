import { ChatIcon, colors, IconTile, NightBackdrop, surfaceShadow } from "@/components/chat-ui";
import * as Device from "expo-device";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const devMenu = Platform.OS === "web" ? "Abre las herramientas del navegador." : Device.isDevice
    ? "Agita el dispositivo o pulsa m en la terminal."
    : Platform.OS === "android" ? "Pulsa Ctrl + M en el emulador." : "Pulsa Cmd + D en el simulador.";

  return (
    <NightBackdrop>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.content}>
            <IconTile name="chat" accent />
            <Text accessibilityRole="header" style={styles.title}>Mi Chat</Text>
            <Link href="/(app)" style={styles.link}>Ir a conversaciones</Link>
            <View style={styles.card}>
              <View style={styles.cardHeader}><ChatIcon name="docs" color={colors.purple} /><Text style={styles.cardTitle}>Desarrollo</Text></View>
              <Text style={styles.body}>Pantalla inicial: src/app/index.tsx</Text>
              <Text style={styles.body}>{devMenu}</Text>
              <Text style={styles.body}>Proyecto limpio: npm run reset-project</Text>
              <Link href="/explore" style={styles.cardLink}>Explorar la configuración de Expo</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NightBackdrop>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 22 },
  content: { width: "100%", maxWidth: 520, alignSelf: "center", gap: 15 },
  title: { color: colors.white, fontSize: 48, letterSpacing: -2, fontWeight: "900" },
  link: { color: colors.lime, fontSize: 17, fontWeight: "800", paddingVertical: 12, textDecorationLine: "underline" },
  card: { ...surfaceShadow, borderRadius: 23, padding: 20, gap: 10, backgroundColor: colors.white },
  cardHeader: { flexDirection: "row", gap: 8, alignItems: "center" },
  cardTitle: { color: colors.ink, fontSize: 21, fontWeight: "900" },
  body: { color: colors.muted, fontSize: 15, lineHeight: 20 },
  cardLink: { color: colors.purple, fontSize: 15, paddingVertical: 12, fontWeight: "800" },
});
