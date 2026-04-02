import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Download, FileText, FilePlus, FolderSearch, Globe, Loader2, Pencil, Search, Terminal, Wrench } from "lucide-react";
import { cn } from "../lib/utils.js";
export const defaultToolIconMap = {
    WebSearch: Globe,
    Bash: Terminal,
    Read: FileText,
    Edit: Pencil,
    Write: FilePlus,
    Grep: Search,
    Glob: FolderSearch,
    WebFetch: Download,
    ListDir: FolderSearch,
};
function formatToolName(name) {
    return name
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
function resolveIcon(toolName, iconMap) {
    return iconMap[toolName] ?? Wrench;
}
function formatArgs(toolName, args) {
    if (!args)
        return null;
    if (toolName === "Bash" && args.command)
        return String(args.command);
    if (toolName === "Read" && args.path)
        return String(args.path);
    if (toolName === "Edit" && args.file_path)
        return String(args.file_path);
    if (toolName === "Write" && args.file_path)
        return String(args.file_path);
    if (toolName === "Grep" && args.pattern)
        return String(args.pattern);
    if (toolName === "Glob" && args.pattern)
        return String(args.pattern);
    if (toolName === "WebSearch" && args.query)
        return String(args.query);
    if (toolName === "ListDir" && args.path)
        return String(args.path);
    return null;
}
export function ToolActivity({ toolName, state, args, className, iconMap }) {
    const mergedIconMap = iconMap ? { ...defaultToolIconMap, ...iconMap } : defaultToolIconMap;
    const Icon = resolveIcon(toolName, mergedIconMap);
    const isActive = state === "call" || state === "partial-call";
    const displayName = formatToolName(toolName);
    const argsPreview = formatArgs(toolName, args);
    return (_jsxs("div", { className: cn("flex items-center gap-2 rounded-md border px-3 py-2 text-sm", "border-amber-500/30 bg-amber-500/5", className), children: [_jsx("span", { className: "text-amber-500 shrink-0", "aria-hidden": "true", children: _jsx(Icon, { size: 14 }) }), _jsx("span", { className: "font-medium font-mono text-amber-500", children: displayName }), argsPreview && (_jsx("span", { className: "truncate text-xs text-muted-foreground font-mono max-w-[300px]", children: argsPreview })), _jsx("span", { className: "ml-auto text-muted-foreground", children: isActive ? (_jsx(Loader2, { size: 14, className: "animate-spin text-amber-500", "aria-label": "Executando..." })) : (_jsx(Check, { size: 14, className: "text-green-500", "aria-label": "Concluido" })) })] }));
}
