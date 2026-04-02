import type { Message } from "@ai-sdk/react";
import type { DisplayRendererMap } from "../display/registry.js";
export interface MessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
    displayRenderers?: DisplayRendererMap;
    attachmentUrl?: (ref: string) => string;
    className?: string;
}
export declare const MessageBubble: import("react").NamedExoticComponent<MessageBubbleProps>;
