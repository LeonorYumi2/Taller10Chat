import { ChatError } from "@shared/domain/errors/AppError";
import { randomUUID } from "expo-crypto";
import { File } from "expo-file-system";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Platform } from "react-native";
import { ChatImage, MAX_CHAT_IMAGE_BYTES } from "../domain/entities/ChatImage";

export interface ImagePreview extends ChatImage {
  uri: string;
}

function detectImageType(bytes: Uint8Array): ChatImage["mimeType"] | undefined {
  const matches = (signature: number[], offset = 0) =>
    signature.every((value, index) => bytes[offset + index] === value);
  if (matches([255, 216, 255])) return "image/jpeg";
  if (matches([137, 80, 78, 71, 13, 10, 26, 10])) return "image/png";
  if (matches([82, 73, 70, 70]) && matches([87, 69, 66, 80], 8)) return "image/webp";
}

export async function pickChatImage(): Promise<ImagePreview | null> {
  // El selector del sistema concede acceso solo al archivo elegido.
  const result = await launchImageLibraryAsync({ mediaTypes: ["images"] });
  const asset = result.assets?.[0];
  if (result.canceled || !asset) return null;

  const nativeFile = Platform.OS === "web" ? null : new File(asset.uri);
  const file = nativeFile ?? asset.file;
  if (!file || !file.size) throw new ChatError("No se pudo leer la imagen seleccionada.");
  if (file.size > MAX_CHAT_IMAGE_BYTES) throw new ChatError("La imagen debe pesar hasta 6 MB.");

  const bytes = nativeFile ? await nativeFile.arrayBuffer() : await (await fetch(asset.uri)).arrayBuffer();
  if (bytes.byteLength > MAX_CHAT_IMAGE_BYTES) throw new ChatError("La imagen debe pesar hasta 6 MB.");
  const mimeType = detectImageType(new Uint8Array(bytes));
  if (!mimeType) throw new ChatError("Selecciona una imagen JPG, PNG o WebP.");
  return { id: randomUUID(), bytes, mimeType, uri: asset.uri };
}
