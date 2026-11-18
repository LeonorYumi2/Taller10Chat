import { supabase } from "@shared/infrastructure/supabase/client";
import { ChatError } from "@shared/domain/errors/AppError";
import { CHAT_IMAGE_BUCKET, ChatImage } from "../../domain/entities/ChatImage";
import { Message, Room } from "../../domain/entities/Message";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

interface MessageRow {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_path?: string | null;
}

const messageFields = "*, profiles(username)";
const extensions = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const storage = supabase.storage.from(CHAT_IMAGE_BUCKET);

function mapMessage(row: MessageRow, authorUsername?: string): Message {
  return {
    id: row.id,
    roomId: row.room_id,
    userId: row.user_id,
    content: row.content,
    imagePath: row.image_path ?? undefined,
    createdAt: new Date(row.created_at),
    authorUsername,
  };
}

export class SupabaseChatRepository implements IChatRepository {
  async getRooms(): Promise<Room[]> {
    const { data, error } = await supabase.from("rooms").select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(this.mapRoom);
  }

  async createRoom(name: string, userId: string): Promise<Room> {
    const { data, error } = await supabase.from("rooms")
      .insert({ name, created_by: userId }).select().single();
    if (error) throw error;
    return this.mapRoom(data);
  }

  async getMessages(roomId: string): Promise<Message[]> {
    const { data, error } = await supabase.from("messages").select(messageFields)
      .eq("room_id", roomId).order("created_at", { ascending: false })
      .order("id", { ascending: false }).limit(50);
    if (error) throw error;
    return (data ?? []).reverse().map((row) => mapMessage(row, row.profiles?.username));
  }

  async sendMessage(roomId: string, userId: string, content: string): Promise<Message> {
    const { data, error } = await supabase.from("messages")
      .insert({ room_id: roomId, user_id: userId, content })
      .select(messageFields).single();
    if (error) throw error;
    return mapMessage(data, data.profiles?.username);
  }

  async sendImage(roomId: string, userId: string, image: ChatImage): Promise<Message> {
    const path = `${roomId}/${userId}/${image.id}.${extensions[image.mimeType]}`;
    const findMessage = () => supabase.from("messages").select(messageFields)
      .eq("room_id", roomId).eq("user_id", userId).eq("image_path", path).maybeSingle();

    const previous = await findMessage();
    if (previous.error) throw new ChatError("No se pudo verificar el acceso al chat. Intenta de nuevo.");
    if (previous.data) return mapMessage(previous.data, previous.data.profiles?.username);

    const { error: uploadError } = await storage.upload(path, image.bytes, {
      contentType: image.mimeType,
      upsert: false,
    });
    // Un reintento conserva el UUID y puede encontrar el archivo ya subido.
    if (uploadError && !("statusCode" in uploadError &&
        ["409", "Duplicate", "ResourceAlreadyExists"].includes(String(uploadError.statusCode)))) {
      throw new ChatError("No se pudo subir la imagen. Revisa tu conexión y el acceso a la sala.");
    }

    const { data, error } = await supabase.from("messages")
      .insert({ room_id: roomId, user_id: userId, content: "Imagen", image_path: path })
      .select(messageFields).single();
    if (!error) return mapMessage(data, data.profiles?.username);

    const saved = await findMessage();
    if (saved.data) return mapMessage(saved.data, saved.data.profiles?.username);
    throw new ChatError("No se pudo publicar la imagen. Puedes reintentar desde la vista previa.");
  }

  async getImageUrl(path: string): Promise<string> {
    const { data, error } = await storage.createSignedUrl(path, 300);
    if (error) throw error;
    return data.signedUrl;
  }

  subscribeToRoom(roomId: string, onMessage: (msg: Message) => void, onSubscribed?: () => void) {
    let active = true;
    const channel = supabase.channel(`room:${roomId}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}`,
      }, async ({ new: row }) => {
        const message = row as MessageRow;
        const { data } = await supabase.from("profiles").select("username")
          .eq("id", message.user_id).maybeSingle();
        if (active) onMessage(mapMessage(message, data?.username));
      }).subscribe((status) => {
        if (active && status === "SUBSCRIBED") onSubscribed?.();
      });

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }

  private mapRoom = (row: { id: string; name: string; created_by: string; created_at: string }): Room => ({
    id: row.id, name: row.name, createdBy: row.created_by, createdAt: new Date(row.created_at),
  });
}
