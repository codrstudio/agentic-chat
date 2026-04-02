import type { Message } from "@ai-sdk/react";
import type { DisplayRendererMap } from "../display/registry.js";
export interface MessageListProps {
    messages: Message[];
    isLoading?: boolean;
    displayRenderers?: DisplayRendererMap;
    attachmentUrl?: (ref: string) => string;
    className?: string;
    error?: Error;
    onRetry?: () => void;
}
export declare function MessageList({ messages, isLoading, displayRenderers, attachmentUrl, className, error, onRetry }: MessageListProps): import("react/jsx-runtime").JSX.Element;
