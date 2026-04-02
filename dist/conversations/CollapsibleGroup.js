"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible.js";
import { cn } from "../lib/utils.js";
function CollapsibleGroup({ label, icon, open, onToggle, children }) {
    return (_jsxs(Collapsible, { open: open, onOpenChange: onToggle, children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs("button", { className: "flex w-full items-center gap-1 px-2 py-1 hover:bg-accent rounded-md", "aria-expanded": open, children: [_jsx(ChevronRight, { className: cn("size-3 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-90") }), icon && _jsx("span", { className: "shrink-0", children: icon }), _jsx("span", { className: "text-xs font-medium text-muted-foreground", children: label })] }) }), _jsx(CollapsibleContent, { children: children })] }));
}
export { CollapsibleGroup };
