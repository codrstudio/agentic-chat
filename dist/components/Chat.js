import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
import { ChatProvider } from "../hooks/ChatProvider.js";
import { useChatContext } from "../hooks/ChatProvider.js";
import { MessageList } from "./MessageList.js";
import { MessageInput } from "./MessageInput.js";
function ChatContent({ displayRenderers, placeholder, enableAttachments = true, enableVoice = true }) {
    const { messages, input, setInput, handleSubmit, isLoading, isUploading, stop, error, reload, buildAttachmentUrl } = useChatContext();
    return (_jsxs(_Fragment, { children: [_jsx(MessageList, { messages: messages, isLoading: isLoading, displayRenderers: displayRenderers, attachmentUrl: buildAttachmentUrl, error: error ?? undefined, onRetry: reload }), _jsx("div", { className: "px-4 pb-4", children: _jsx(MessageInput, { input: input, setInput: setInput, handleSubmit: handleSubmit, isLoading: isLoading, isUploading: isUploading, stop: stop, placeholder: placeholder, enableAttachments: enableAttachments, enableVoice: enableVoice }) })] }));
}
export function Chat({ endpoint, token, sessionId, initialMessages, displayRenderers, placeholder, header, footer, className, enableAttachments, enableVoice, }) {
    return (_jsx(ChatProvider, { endpoint: endpoint, token: token, sessionId: sessionId, initialMessages: initialMessages, children: _jsxs("div", { className: cn("flex flex-col h-full bg-background text-foreground", className), children: [header, _jsx(ChatContent, { displayRenderers: displayRenderers, placeholder: placeholder, enableAttachments: enableAttachments, enableVoice: enableVoice }), footer] }) }, sessionId));
}
