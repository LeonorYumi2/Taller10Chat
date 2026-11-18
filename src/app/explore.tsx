import { colors, IconTile, NightBackdrop, surfaceShadow } from "@/components/chat-ui";
import { ExternalLink } from "@/components/external-link";
import { Collapsible } from "@/components/ui/collapsible";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <NightBackdrop>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.content}>
            <Link href="/" style={styles.home}>Volver a inicio</Link>
            <IconTile name="docs" accent />
            <Text accessibilityRole="header" style={styles.title}>Explorar Expo</Text>
            <ExternalLink href="https://docs.expo.dev" style={styles.home}>Documentación de Expo</ExternalLink>
            <View style={styles.cards}>
              <Collapsible title="Rutas de la aplicación">
                <Text style={styles.body}>Las pantallas viven en src/app. Los archivos _layout.tsx organizan la navegación.</Text>
                <ExternalLink href="https://docs.expo.dev/router/introduction" style={styles.link}>Guía de Expo Router</ExternalLink>
              </Collapsible>
              <Collapsible title="Android, iOS y web">
                <Text style={styles.body}>Puedes abrir el proyecto en Android, iOS o web. Pulsa w en la terminal de Expo para abrir el navegador.</Text>
                <Image source={require("../../assets/images/tutorial-web.png")} style={styles.tutorial} contentFit="contain" />
              </Collapsible>
              <Collapsible title="Imágenes">
                <Text style={styles.body}>Los archivos @2x y @3x sirven distintas densidades de pantalla.</Text>
                <Image source={require("@/assets/images/react-logo.png")} style={styles.logo} contentFit="contain" />
                <ExternalLink href="https://reactnative.dev/docs/images" style={styles.link}>Guía de imágenes</ExternalLink>
              </Collapsible>
              <Collapsible title="Temas claro y oscuro">
                <Text style={styles.body}>useColorScheme() permite consultar el tema del sistema para adaptar los colores de una interfaz.</Text>
                <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/" style={styles.link}>Guía de temas</ExternalLink>
              </Collapsible>
              <Collapsible title="Animaciones">
                <Text style={styles.body}>Las secciones de esta pantalla usan React Native Reanimated para aparecer de forma gradual.</Text>
              </Collapsible>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NightBackdrop>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 22 },
  content: { width: "100%", maxWidth: 630, alignSelf: "center", gap: 15 },
  title: { fontSize: 40, letterSpacing: -1.4, color: colors.white, fontWeight: "900" },
  home: { color: colors.lime, fontWeight: "800", paddingVertical: 10, fontSize: 16 },
  cards: { ...surfaceShadow, padding: 14, borderRadius: 24, backgroundColor: colors.paper, gap: 10 },
  body: { color: colors.muted, fontSize: 15, lineHeight: 21 },
  link: { color: colors.purple, fontWeight: "800", paddingVertical: 8 },
  tutorial: { width: "100%", aspectRatio: 296 / 171, borderRadius: 12 },
  logo: { width: 80, height: 80, alignSelf: "center" },
});
