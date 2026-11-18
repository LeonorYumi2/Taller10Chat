import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { GetMessagesUseCase } from "@features/chat/application/use-cases/GetMessagesUseCase";
import { SendImageUseCase } from "@features/chat/application/use-cases/SendImageUseCase";
import { SendMessageUseCase } from "@features/chat/application/use-cases/SendMessageUseCase";
import { SubscribeToRoomUseCase } from "@features/chat/application/use-cases/SubscribeToRoomUseCase";
import { ChatImage } from "@features/chat/domain/entities/ChatImage";
import { Message } from "@features/chat/domain/entities/Message";
import { SupabaseChatRepository } from "@features/chat/infrastructure/repositories/SupabaseChatRepository";
import { ChatError } from "@shared/domain/errors/AppError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { randomUUID } from "expo-crypto";
import { useEffect, useMemo } from "react";

const chatRepo = new SupabaseChatRepository();
const sendMessageUseCase = new SendMessageUseCase(chatRepo);
const sendImageUseCase = new SendImageUseCase(chatRepo);
const getMessagesUseCase = new GetMessagesUseCase(chatRepo);
const subscribeUseCase = new SubscribeToRoomUseCase(chatRepo);

function mergeMessage(messages: Message[], message: Message, optimisticId?: string) {
  return [...messages.filter((item) => item.id !== message.id && item.id !== optimisticId), message]
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export function useChat(roomId: string) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const userId = user?.id;
  const queryKey = useMemo(() => ["messages", userId, roomId], [userId, roomId]);

  const { data: messages = [], isPending, isError, refetch } = useQuery({
    queryKey,
    queryFn: () => getMessagesUseCase.execute(roomId),
    enabled: !!userId && !!roomId,
  });

  useEffect(() => {
    if (!userId || !roomId) return;
    return subscribeUseCase.execute(roomId, (message) => {
      queryClient.setQueryData(queryKey, (old: Message[] = []) => mergeMessage(old, message));
    }, () => { void queryClient.invalidateQueries({ queryKey }); });
  }, [queryClient, queryKey, roomId, userId]);

  const textMutation = useMutation({
    mutationFn: (content: string) => {
      if (!userId) throw new ChatError("Inicia sesión para enviar mensajes.");
      return sendMessageUseCase.execute(roomId, userId, content);
    },
    onMutate: async (content) => {
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey });
      const message: Message = {
        id: `temp-${randomUUID()}`, roomId, userId, content,
        createdAt: new Date(), authorUsername: user?.username,
      };
      queryClient.setQueryData(queryKey, (old: Message[] = []) => mergeMessage(old, message));
      return message.id;
    },
    onSuccess: (message, _content, optimisticId) => {
      queryClient.setQueryData(queryKey, (old: Message[] = []) => mergeMessage(old, message, optimisticId));
    },
    onError: (_error, _content, optimisticId) => {
      queryClient.setQueryData(queryKey, (old: Message[] = []) => old.filter((item) => item.id !== optimisticId));
    },
  });

  const imageMutation = useMutation({
    mutationFn: (image: ChatImage) => {
      if (!userId) throw new ChatError("Inicia sesión para enviar imágenes.");
      return sendImageUseCase.execute(roomId, userId, image);
    },
    onSuccess: (message) => {
      queryClient.setQueryData(queryKey, (old: Message[] = []) => mergeMessage(old, message));
    },
    gcTime: 0,
  });

  return { messages, isPending, isError, refetch, textMutation, imageMutation };
}

export function useChatImageUrl(path: string) {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ["chat-image-url", userId, path],
    queryFn: () => chatRepo.getImageUrl(path),
    enabled: !!userId,
    staleTime: 240_000,
    gcTime: 300_000,
  });
}
