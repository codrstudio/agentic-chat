export interface ToolResultProps {
    toolName: string;
    result: unknown;
    isError?: boolean;
    className?: string;
}
export declare function ToolResult({ toolName, result, isError, className }: ToolResultProps): import("react/jsx-runtime").JSX.Element;
