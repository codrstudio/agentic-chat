export interface Attachment {
    id: string;
    file: File;
    preview?: string;
    type: "image" | "file" | "audio";
}
export interface MessageInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSubmit: (e: React.FormEvent, attachments?: Attachment[]) => void;
    isLoading?: boolean;
    isUploading?: boolean;
    stop?: () => void;
    placeholder?: string;
    className?: string;
    enableAttachments?: boolean;
    enableVoice?: boolean;
}
export declare function MessageInput({ input, setInput, handleSubmit, isLoading, isUploading, stop, placeholder, className, enableAttachments, enableVoice, }: MessageInputProps): import("react/jsx-runtime").JSX.Element;
