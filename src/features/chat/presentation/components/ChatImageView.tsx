import { colors } from "@/components/chat-ui";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useChatImageUrl } from "../hooks/useChat";

interface Props {
  path: string;
  expanded?: boolean;
  onOpen?: () => void;
}

export function ChatImageView({ path, expanded = false, onOpen }: Props) {
  const { data: url, isPending, isFetching, isError, refetch } = useChatImageUrl(path);
  const [loadedUrl, setLoadedUrl] = useState<string>();
  const [failedUrl, setFailedUrl] = useState<string>();
  const failed = isError || (!!url && failedUrl === url);
  const loaded = !!url && loadedUrl === url && !failed;
  const retry = () => {
    setFailedUrl(undefined);
    void refetch();
  };

  return (
    <TouchableOpacity
      style={expanded ? styles.expanded : styles.thumbnail}
      accessibilityRole="button"
      accessibilityLabel={failed ? "Reintentar carga de imagen" : "Ampliar imagen"}
      disabled={isFetching || (!failed && (!loaded || !onOpen))}
      onPress={failed ? retry : onOpen}
      activeOpacity={0.85}
    >
      {!!url && !failed && (
        <Image
          source={url}
          recyclingKey={path}
          style={StyleSheet.absoluteFill}
          contentFit={expanded ? "contain" : "cover"}
          cachePolicy="memory"
          onLoad={() => setLoadedUrl(url)}
          onError={() => setFailedUrl(url)}
          accessibilityLabel="Imagen del chat"
        />
      )}
      {(isPending || isFetching || (!failed && !loaded)) && (
        <ActivityIndicator color={expanded ? colors.lime : colors.purple} accessibilityLabel="Cargando imagen" />
      )}
      {failed && !isFetching && (
        <View style={styles.error}>
          <Text style={styles.errorText}>No se pudo cargar</Text>
          <Text style={styles.retry}>Reintentar</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 224, maxWidth: "100%", aspectRatio: 4 / 3, borderRadius: 14,
    overflow: "hidden", backgroundColor: colors.lavender, alignItems: "center", justifyContent: "center",
  },
  expanded: { flex: 1, alignItems: "center", justifyContent: "center" },
  error: { backgroundColor: colors.white, borderRadius: 12, padding: 10, alignItems: "center" },
  errorText: { color: colors.ink, textAlign: "center" },
  retry: { color: colors.purple, fontWeight: "600", marginTop: 4 },
});
