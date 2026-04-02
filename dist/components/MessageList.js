import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { useRef, useEffect, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MessageBubble } from "./MessageBubble.js";
import { StreamingIndicator } from "./StreamingIndicator.js";
import { ErrorNote } from "./ErrorNote.js";
import { ScrollBar } from "../ui/scroll-area.js";
import { cn } from "../lib/utils.js";
export function MessageList({ messages, isLoading, displayRenderers, attachmentUrl, className, error, onRetry }) {
    const viewportRef = useRef(null);
    const isFollowingRef = useRef(true);
    const lastAssistantIndex = useMemo(() => messages.reduceRight((found, msg, i) => {
        if (found !== -1)
            return found;
        return msg.role === "assistant" ? i : -1;
    }, -1), [messages]);
    const virtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => viewportRef.current,
        estimateSize: () => 80,
        overscan: 5,
        paddingStart: 16,
    });
    // Track scroll position to detect if user is following
    const handleScroll = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport)
            return;
        const distanceFromBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
        isFollowingRef.current = distanceFromBottom <= 100;
    }, []);
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport)
            return;
        viewport.addEventListener("scroll", handleScroll, { passive: true });
        return () => viewport.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
    // Auto-scroll to bottom when following
    useEffect(() => {
        if (messages.length > 0 && isFollowingRef.current) {
            virtualizer.scrollToIndex(messages.length - 1, { align: "end" });
        }
    }, [messages, virtualizer]);
    // Auto-scroll when error appears
    useEffect(() => {
        if (error && isFollowingRef.current) {
            const viewport = viewportRef.current;
            if (viewport)
                viewport.scrollTop = viewport.scrollHeight;
        }
    }, [error]);
    const virtualItems = virtualizer.getVirtualItems();
    if (messages.length === 0) {
        return (_jsxs(ScrollAreaPrimitive.Root, { className: cn("flex-1 relative overflow-hidden", className), children: [_jsx(ScrollAreaPrimitive.Viewport, { ref: viewportRef, className: "h-full w-full rounded-[inherit]", children: _jsx("div", { className: "flex items-center justify-center text-muted-foreground text-sm py-8", children: "Envie uma mensagem para comecar" }) }), _jsx(ScrollBar, {}), _jsx(ScrollAreaPrimitive.Corner, {})] }));
    }
    return (_jsxs(ScrollAreaPrimitive.Root, { className: cn("flex-1 relative overflow-hidden", className), children: [_jsxs(ScrollAreaPrimitive.Viewport, { ref: viewportRef, className: "h-full w-full rounded-[inherit]", children: [_jsx("div", { className: "relative w-full", style: { height: virtualizer.getTotalSize() + 16 }, children: _jsx("div", { children: virtualItems.map((virtualRow) => {
                                const message = messages[virtualRow.index];
                                return (_jsx("div", { "data-index": virtualRow.index, ref: virtualizer.measureElement, className: "pb-3 px-4", style: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }, children: _jsx(MessageBubble, { message: message, isStreaming: virtualRow.index === lastAssistantIndex && isLoading && messages[messages.length - 1]?.role === "assistant", displayRenderers: displayRenderers, attachmentUrl: attachmentUrl }) }, message.id ?? virtualRow.index));
                            }) }) }), isLoading && messages[messages.length - 1]?.role !== "assistant" && (_jsx("div", { className: "px-4 pb-3", children: _jsx(StreamingIndicator, {}) })), !isLoading && error && messages.length > 0 && messages[messages.length - 1]?.role !== "assistant" && (_jsx("div", { className: "px-4 pb-3", children: _jsx(ErrorNote, { onRetry: onRetry }) }))] }), _jsx(ScrollBar, {}), _jsx(ScrollAreaPrimitive.Corner, {})] }));
}
