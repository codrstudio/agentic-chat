import React from "react";
import type { DisplayRendererMap } from "../display/registry.js";
export interface ChatProps {
    endpoint: string;
    token: string;
    sessionId: string;
    initialMessages?: Array<{
        id?: string;
        role: "user" | "assistant";
        content: string;
        parts?: unknown[];
    }>;
    displayRenderers?: DisplayRendererMap;
    placeholder?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    enableAttachments?: boolean;
    enableVoice?: boolean;
}
export declare function Chat({ endpoint, token, sessionId, initialMessages, displayRenderers, placeholder, header, footer, className, enableAttachments, enableVoice, }: ChatProps): import("react/jsx-runtime").JSX.Element;
