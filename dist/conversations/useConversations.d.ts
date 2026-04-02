import type { Conversation } from "./types.js";
export interface UseConversationsOptions {
    endpoint?: string;
    token?: string;
    fetcher?: (url: string, init?: RequestInit) => Promise<Response>;
    autoFetch?: boolean;
}
export interface UseConversationsReturn {
    conversations: Conversation[];
    isLoading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
    create: (agentId: string) => Promise<Conversation>;
    rename: (id: string, title: string) => Promise<void>;
    star: (id: string, starred: boolean) => Promise<void>;
    remove: (id: string) => Promise<void>;
    exportUrl: (id: string, format?: "json" | "markdown") => string;
}
export declare function useConversations(options?: UseConversationsOptions): UseConversationsReturn;
