import type { Message } from "@ai-sdk/react";
import type { BackendMessage, Conversation } from "./types.js";
export declare function formatRelativeTime(dateStr: string): string;
export declare function buildInitialMessages(messages?: BackendMessage[]): Message[] | undefined;
export declare function groupConversations(conversations: Conversation[]): {
    favorites: Conversation[];
    history: Conversation[];
};
