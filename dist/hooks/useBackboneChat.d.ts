import type { Message } from "@ai-sdk/react";
import type React from "react";
export type { Message };
export interface UseBackboneChatOptions {
    endpoint: string;
    token: string;
    sessionId: string;
    initialMessages?: Message[];
    enableRichContent?: boolean;
}
export declare function useBackboneChat(options: UseBackboneChatOptions): {
    error: Error;
    handleSubmit: (e: React.FormEvent, attachments?: Array<{
        file: File;
    }>) => void;
    reload: (chatRequestOptions?: import("@ai-sdk/ui-utils").ChatRequestOptions) => Promise<string>;
    isUploading: boolean;
    buildAttachmentUrl: (ref: string) => string;
    messages: import("@ai-sdk/ui-utils").UIMessage[];
    append: (message: Message | import("@ai-sdk/ui-utils").CreateMessage, chatRequestOptions?: import("@ai-sdk/ui-utils").ChatRequestOptions) => Promise<string | null | undefined>;
    stop: () => void;
    experimental_resume: () => void;
    setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    metadata?: Object;
    isLoading: boolean;
    status: "submitted" | "streaming" | "ready" | "error";
    data?: import("@ai-sdk/ui-utils").JSONValue[];
    setData: (data: import("@ai-sdk/ui-utils").JSONValue[] | undefined | ((data: import("@ai-sdk/ui-utils").JSONValue[] | undefined) => import("@ai-sdk/ui-utils").JSONValue[] | undefined)) => void;
    id: string;
    addToolResult: ({ toolCallId, result, }: {
        toolCallId: string;
        result: any;
    }) => void;
};
