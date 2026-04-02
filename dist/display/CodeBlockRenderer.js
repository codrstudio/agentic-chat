import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button.js";
import { cn } from "../lib/utils.js";
export function CodeBlockRenderer({ language, code, title, lineNumbers }) {
    const [copied, setCopied] = useState(false);
    async function handleCopy() {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    const displayLines = lineNumbers
        ? code.split("\n").map((line, i) => (_jsxs("span", { className: "flex gap-4", children: [_jsx("span", { className: "select-none text-muted-foreground w-6 text-right shrink-0", children: i + 1 }), _jsx("span", { children: line })] }, i)))
        : code;
    return (_jsxs("div", { className: cn("rounded-md border border-border bg-muted/30 overflow-hidden"), children: [_jsxs("div", { className: "flex items-center justify-between px-3 py-1.5 border-b border-border", children: [_jsx("span", { className: "text-xs text-muted-foreground font-mono", children: title ?? language }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: handleCopy, "aria-label": copied ? "Copiado!" : "Copiar código", className: "h-7 gap-1.5", children: [copied ? _jsx(Check, { className: "h-3 w-3" }) : _jsx(Copy, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: copied ? "Copiado!" : "Copiar" })] })] }), _jsx("pre", { className: "p-4 overflow-x-auto font-mono text-sm", children: lineNumbers ? (_jsx("code", { children: displayLines })) : (_jsx("code", { children: code })) })] }));
}
