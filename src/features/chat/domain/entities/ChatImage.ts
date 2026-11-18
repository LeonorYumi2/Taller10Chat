export const MAX_CHAT_IMAGE_BYTES = 6 * 1024 * 1024;
export const CHAT_IMAGE_BUCKET = "chat-images";

export interface ChatImage {
  id: string;
  bytes: ArrayBuffer;
  mimeType: "image/jpeg" | "image/png" | "image/webp";
}
