import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Brain, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible.js";
export function ReasoningBlock({ content, isStreaming = false, className }) {
    const [expanded, setExpanded] = useState(isStreaming);
    useEffect(() => {
        if (isStreaming) {
            setExpanded(true);
        }
        else {
            setExpanded(false);
        }
    }, [isStreaming]);
    return (_jsx(Collapsible, { open: expanded, onOpenChange: setExpanded, className: className, children: _jsxs("div", { className: "border border-purple-500/30 bg-purple-500/5 rounded-md text-sm overflow-hidden", children: [_jsxs(CollapsibleTrigger, { className: "flex items-center gap-2 px-3 py-2 w-full text-left font-medium text-purple-400 hover:bg-purple-500/10 cursor-pointer", children: [_jsx(Brain, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), _jsx("span", { className: "font-mono text-xs", children: "reasoning:" }), expanded
                            ? _jsx(ChevronDown, { className: "h-3.5 w-3.5 ml-auto", "aria-hidden": "true" })
                            : _jsx(ChevronRight, { className: "h-3.5 w-3.5 ml-auto", "aria-hidden": "true" })] }), _jsx(CollapsibleContent, { children: _jsx("div", { className: "max-h-96 overflow-y-auto px-3 py-3 text-purple-300/80 whitespace-pre-wrap break-words border-t border-purple-500/20 text-xs", children: content }) })] }) }));
}
