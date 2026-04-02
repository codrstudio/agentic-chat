import { type LucideIcon } from "lucide-react";
export type ToolActivityState = "call" | "partial-call" | "result";
export interface ToolActivityProps {
    toolName: string;
    state: ToolActivityState;
    args?: Record<string, unknown>;
    className?: string;
    iconMap?: Partial<Record<string, LucideIcon>>;
}
export declare const defaultToolIconMap: Record<string, LucideIcon>;
export declare function ToolActivity({ toolName, state, args, className, iconMap }: ToolActivityProps): import("react/jsx-runtime").JSX.Element;
