import { ChatImage } from "../entities/ChatImage";
import { Message, Room } from "../entities/Message";

export interface IChatRepository {
  getRooms(): Promise<Room[]>;
  createRoom(name: string, userId: string): Promise<Room>;
  getMessages(roomId: string): Promise<Message[]>;
  sendMessage(roomId: string, userId: string, content: string): Promise<Message>;
  sendImage(roomId: string, userId: string, image: ChatImage): Promise<Message>;
  subscribeToRoom(
    roomId: string,
    onMessage: (msg: Message) => void,
    onSubscribed?: () => void,
  ): () => void;
}
