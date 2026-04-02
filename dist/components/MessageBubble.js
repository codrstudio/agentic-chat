import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useState, useCallback } from "react";
import { cn } from "../lib/utils.js";
import { Markdown } from "./Markdown.js";
import { StreamingIndicator } from "./StreamingIndicator.js";
import { PartRenderer } from "../parts/PartRenderer.js";
import { Copy, Check } from "lucide-react";
function extractText(message) {
    if (message.content)
        return message.content;
    if (!Array.isArray(message.parts))
        return "";
    return message.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("\n");
}
function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [text]);
    return (_jsx("button", { type: "button", onClick: handleCopy, className: cn("h-7 w-7 flex items-center justify-center rounded-lg transition-all", "text-muted-foreground/50 opacity-0 group-hover/bubble:opacity-100", "hover:bg-muted/50 hover:text-muted-foreground"), "aria-label": copied ? "Copiado" : "Copiar mensagem", children: copied ? _jsx(Check, { className: "h-3.5 w-3.5" }) : _jsx(Copy, { className: "h-3.5 w-3.5" }) }));
}
export const MessageBubble = memo(function MessageBubble({ message, isStreaming, displayRenderers, attachmentUrl, className }) {
    const isUser = message.role === "user";
    const hasParts = Array.isArray(message.parts) && message.parts.length > 0;
    return (_jsxs("div", { className: cn("group/bubble", isUser ? "flex flex-col items-end" : "flex flex-col items-start"), children: [_jsxs("div", { className: cn("min-w-0 overflow-hidden", isUser
                    ? "max-w-[80%] rounded-lg rounded-br-sm bg-muted text-foreground px-4 py-2.5"
                    : "w-full text-foreground py-1", className), children: [hasParts
                        ? _jsx("div", { className: "flex flex-col gap-3", children: message.parts.map((part, i) => (_jsx(PartRenderer, { part: part, isStreaming: isStreaming, displayRenderers: displayRenderers, attachmentUrl: attachmentUrl }, i))) })
                        : _jsx(Markdown, { children: message.content }), isStreaming && !isUser && _jsx(StreamingIndicator, {})] }), !isStreaming && (_jsx("div", { className: cn("flex items-center gap-0.5 mt-0.5", isUser ? "justify-end" : "justify-start"), children: _jsx(CopyButton, { text: extractText(message) }) }))] }));
}, (prev, next) => prev.message === next.message
    && prev.isStreaming === next.isStreaming
    && prev.displayRenderers === next.displayRenderers
    && prev.attachmentUrl === next.attachmentUrl
    && prev.className === next.className);
