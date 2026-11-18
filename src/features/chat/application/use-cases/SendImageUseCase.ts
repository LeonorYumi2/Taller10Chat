import { ChatError } from "@shared/domain/errors/AppError";
import { ChatImage, MAX_CHAT_IMAGE_BYTES } from "../../domain/entities/ChatImage";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

export class SendImageUseCase {
  constructor(private readonly chatRepo: IChatRepository) {}

  execute(roomId: string, userId: string, image: ChatImage) {
    if (!roomId || !userId) throw new ChatError("La sesión o la sala no está disponible.");
    if (!image.bytes.byteLength || image.bytes.byteLength > MAX_CHAT_IMAGE_BYTES) {
      throw new ChatError("Selecciona una imagen de hasta 6 MB.");
    }
    return this.chatRepo.sendImage(roomId, userId, image);
  }
}
