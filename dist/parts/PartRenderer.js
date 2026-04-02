import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useState } from "react";
import { Paperclip, FileText, ChevronDown } from "lucide-react";
import { Markdown } from "../components/Markdown.js";
import { LazyRender } from "../components/LazyRender.js";
import { ReasoningBlock } from "./ReasoningBlock.js";
import { ToolActivity } from "./ToolActivity.js";
import { ToolResult } from "./ToolResult.js";
import { resolveDisplayRenderer } from "../display/registry.js";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible.js";
import { cn } from "../lib/utils.js";
const HEAVY_RENDERERS = new Set([
    "chart", "map", "table",
    "spreadsheet", "gallery", "image",
]);
// ─── Attachment sub-components ────────────────────────────────────────────────
function AttachmentImage({ src }) {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: src, loading: "lazy", alt: "Imagem anexada", className: "max-w-xs rounded-lg border cursor-pointer object-cover", onClick: () => setOpen(true) }), open && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80", onClick: () => setOpen(false), children: _jsx("img", { src: src, alt: "Imagem em tamanho real", className: "max-w-[90vw] max-h-[90vh] rounded-lg", onClick: (e) => e.stopPropagation() }) }))] }));
}
function AudioAttachment({ src }) {
    return (_jsx("audio", { controls: true, src: src, className: "max-w-xs w-full" }));
}
function PdfChip({ src, filename }) {
    return (_jsxs("a", { href: src, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-lg border bg-muted px-3 py-2 text-sm hover:bg-muted/80 transition-colors", children: [_jsx(FileText, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), _jsx("span", { className: "max-w-[200px] truncate", children: filename })] }));
}
function AttachmentTextBlock({ filename, content }) {
    const [open, setOpen] = useState(false);
    const lines = content.split("\n");
    const preview = lines.slice(0, 3).join("\n") + (lines.length > 3 && !open ? "\n…" : "");
    return (_jsxs(Collapsible, { open: open, onOpenChange: setOpen, className: "rounded-lg border text-xs overflow-hidden", children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-muted/50 border-b", children: [_jsx(Paperclip, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), _jsx("span", { className: "flex-1 truncate font-medium", children: filename }), _jsx(CollapsibleTrigger, { asChild: true, children: _jsx("button", { type: "button", className: "text-muted-foreground hover:text-foreground transition-colors", "aria-label": open ? "Recolher" : "Expandir", children: _jsx(ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform", open && "rotate-180") }) }) })] }), _jsx("pre", { className: "px-3 py-2 text-muted-foreground whitespace-pre-wrap break-words", children: preview }), _jsx(CollapsibleContent, { children: _jsx("pre", { className: "px-3 py-2 max-h-40 overflow-auto whitespace-pre-wrap break-words border-t", children: content }) })] }));
}
// ─── Main renderer ────────────────────────────────────────────────────────────
export const PartRenderer = memo(function PartRenderer({ part, isStreaming, displayRenderers, attachmentUrl }) {
    switch (part.type) {
        case "text": {
            const p = part;
            // Pre-processed attachment text: "[📎 filename]\ncontent"
            if (p.text.startsWith("[📎")) {
                const firstNewline = p.text.indexOf("\n");
                const header = firstNewline >= 0 ? p.text.slice(0, firstNewline) : p.text;
                const body = firstNewline >= 0 ? p.text.slice(firstNewline + 1) : "";
                const match = header.match(/^\[📎\s+(.+?)\]?$/);
                const filename = match?.[1] ?? header;
                return _jsx(AttachmentTextBlock, { filename: filename, content: body });
            }
            return _jsx(Markdown, { children: p.text });
        }
        case "reasoning": {
            const p = part;
            return _jsx(ReasoningBlock, { content: p.reasoning, isStreaming: isStreaming });
        }
        case "tool-invocation": {
            const { toolInvocation } = part;
            const isDisplay = toolInvocation.toolName.startsWith("display_");
            if (isDisplay && toolInvocation.state === "result") {
                const result = toolInvocation.result;
                const action = toolInvocation.toolName.replace("display_", "");
                const Renderer = resolveDisplayRenderer(action, displayRenderers);
                if (Renderer) {
                    const rendered = _jsx(Renderer, { ...result });
                    if (!isStreaming && action && HEAVY_RENDERERS.has(action)) {
                        return _jsx(LazyRender, { children: rendered });
                    }
                    return rendered;
                }
            }
            if (toolInvocation.state === "result") {
                return (_jsx(ToolResult, { toolName: toolInvocation.toolName, result: toolInvocation.result }));
            }
            return (_jsx(ToolActivity, { toolName: toolInvocation.toolName, state: toolInvocation.state, args: toolInvocation.args }));
        }
        case "image": {
            const p = part;
            if (!p._ref || !attachmentUrl)
                return null;
            return _jsx(AttachmentImage, { src: attachmentUrl(p._ref) });
        }
        case "file": {
            const p = part;
            if (!p._ref || !attachmentUrl)
                return null;
            const src = attachmentUrl(p._ref);
            if (p.mimeType?.startsWith("audio/")) {
                return _jsx(AudioAttachment, { src: src });
            }
            if (p.mimeType === "application/pdf") {
                // Extract a human-readable filename from the att_ts_hex.ext pattern
                const filename = p._ref.replace(/^att_\d+_[0-9a-f]+\./, "") || p._ref;
                return _jsx(PdfChip, { src: src, filename: filename });
            }
            return null;
        }
        default:
            return null;
    }
});
