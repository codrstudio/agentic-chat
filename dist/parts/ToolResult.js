import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible.js";
import { cn } from "../lib/utils.js";
function serializeResult(result) {
    try {
        if (typeof result === "object" && result !== null && "value" in result) {
            return String(result.value);
        }
        return JSON.stringify(result, null, 2);
    }
    catch {
        return String(result);
    }
}
function extractPreview(result) {
    if (typeof result === "string")
        return result.length > 120 ? result.slice(0, 120) + "..." : result;
    if (typeof result === "object" && result !== null) {
        const r = result;
        if (typeof r.value === "string") {
            const v = r.value;
            return v.length > 120 ? v.slice(0, 120) + "..." : v;
        }
    }
    return null;
}
export function ToolResult({ toolName, result, isError = false, className }) {
    const [expanded, setExpanded] = useState(false);
    const serialized = serializeResult(result);
    const preview = extractPreview(result);
    return (_jsx(Collapsible, { open: expanded, onOpenChange: setExpanded, className: className, children: _jsxs("div", { className: cn("rounded-md border text-sm overflow-hidden", isError
                ? "border-red-500/30 bg-red-500/5"
                : "border-green-500/30 bg-green-500/5"), children: [_jsxs(CollapsibleTrigger, { className: cn("flex items-center gap-2 w-full px-3 py-2 text-left font-medium hover:bg-muted/50 cursor-pointer"), "aria-expanded": expanded, children: [isError ? (_jsx(AlertCircle, { className: "h-3.5 w-3.5 shrink-0 text-red-500", "aria-hidden": "true" })) : (_jsx(CheckCircle, { className: "h-3.5 w-3.5 shrink-0 text-green-500", "aria-hidden": "true" })), _jsx("span", { className: cn("font-mono text-xs", isError ? "text-red-500" : "text-green-500"), children: isError ? `${toolName} erro` : `${toolName} ok` }), !expanded && preview && (_jsx("span", { className: "truncate text-xs text-muted-foreground font-mono max-w-[400px] ml-1", children: preview })), expanded
                            ? _jsx(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground ml-auto", "aria-hidden": "true" })
                            : _jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground ml-auto", "aria-hidden": "true" })] }), _jsx(CollapsibleContent, { children: _jsx("pre", { className: "max-h-80 overflow-y-auto p-3 font-mono text-xs whitespace-pre-wrap break-all bg-muted/30 border-t border-border", children: serialized }) })] }) }));
}
