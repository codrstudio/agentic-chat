import React from "react";
import { useBackboneChat, type UseBackboneChatOptions } from "./useBackboneChat.js";
type ChatContextValue = ReturnType<typeof useBackboneChat>;
export interface ChatProviderProps extends Omit<UseBackboneChatOptions, "initialMessages"> {
    initialMessages?: UseBackboneChatOptions["initialMessages"];
    children: React.ReactNode;
}
export declare function ChatProvider({ endpoint, token, sessionId, initialMessages, children }: ChatProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useChatContext(): ChatContextValue;
export {};
