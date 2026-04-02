import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { useBackboneChat } from "./useBackboneChat.js";
const ChatContext = createContext(null);
export function ChatProvider({ endpoint, token, sessionId, initialMessages, children }) {
    const chat = useBackboneChat({ endpoint, token, sessionId, initialMessages });
    return _jsx(ChatContext.Provider, { value: chat, children: children });
}
export function useChatContext() {
    const ctx = useContext(ChatContext);
    if (!ctx)
        throw new Error("useChatContext must be used within ChatProvider");
    return ctx;
}
