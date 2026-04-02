import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils.js";
export function ErrorNote({ onRetry, className }) {
    return (_jsxs("div", { role: "alert", className: cn("flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive", className), children: [_jsx(AlertTriangle, { className: "size-4 shrink-0" }), _jsx("span", { className: "flex-1", children: "Falha ao processar mensagem" }), onRetry && (_jsxs("button", { type: "button", onClick: onRetry, className: "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors", children: [_jsx(RotateCcw, { className: "size-3.5" }), "Tentar novamente"] }))] }));
}
