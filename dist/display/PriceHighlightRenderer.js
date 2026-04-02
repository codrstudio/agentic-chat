import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
function formatPrice(value, currency) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency,
    }).format(value);
}
export function PriceHighlightRenderer({ value, label, context, source, badge }) {
    return (_jsxs(Card, { className: "p-4 space-y-1 w-fit", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: label }), _jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("span", { className: "text-2xl font-bold text-foreground", children: formatPrice(value.value, value.currency) }), badge && (_jsx(Badge, { variant: "destructive", children: badge.label }))] }), context && _jsx("p", { className: "text-sm text-muted-foreground", children: context }), source && (_jsxs("a", { href: source.url, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1.5 text-xs text-primary hover:underline", children: [source.favicon && (_jsx("img", { src: source.favicon, alt: "", width: 14, height: 14, "aria-hidden": "true" })), _jsx("span", { children: source.name }), _jsx(ExternalLink, { size: 12, "aria-hidden": "true" })] }))] }));
}
