import type { DisplayRendererMap } from "../display/registry.js";
type TextPart = {
    type: "text";
    text: string;
};
type ReasoningPart = {
    type: "reasoning";
    reasoning: string;
};
type ToolInvocationPart = {
    type: "tool-invocation";
    toolInvocation: {
        toolName: string;
        toolCallId?: string;
        state: "call" | "partial-call" | "result";
        args?: Record<string, unknown>;
        result?: unknown;
    };
};
type ImageAttachmentPart = {
    type: "image";
    _ref?: string;
    mimeType?: string;
};
type FileAttachmentPart = {
    type: "file";
    _ref?: string;
    mimeType?: string;
};
type MessagePart = TextPart | ReasoningPart | ToolInvocationPart | ImageAttachmentPart | FileAttachmentPart | {
    type: string;
};
export interface PartRendererProps {
    part: MessagePart;
    isStreaming?: boolean;
    displayRenderers?: DisplayRendererMap;
    attachmentUrl?: (ref: string) => string;
}
export declare const PartRenderer: import("react").NamedExoticComponent<PartRendererProps>;
export {};
