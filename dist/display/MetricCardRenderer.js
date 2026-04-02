import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Card } from "../ui/card.js";
const TREND_CONFIG = {
    up: { Icon: ArrowUp, colorClass: "text-primary" },
    down: { Icon: ArrowDown, colorClass: "text-destructive" },
    neutral: { Icon: ArrowRight, colorClass: "text-muted-foreground" },
};
export function MetricCardRenderer({ label, value, unit, trend }) {
    const trendConfig = trend ? TREND_CONFIG[trend.direction] : null;
    return (_jsxs(Card, { className: "p-4 w-fit", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: label }), _jsxs("div", { className: "flex items-baseline gap-2 mt-1", children: [_jsx("span", { className: "text-2xl font-bold text-foreground", children: value }), unit && _jsx("span", { className: "text-sm text-muted-foreground", children: unit })] }), trend && trendConfig && (_jsxs("div", { className: `flex items-center gap-1 mt-1 text-sm ${trendConfig.colorClass}`, children: [_jsx(trendConfig.Icon, { size: 14, "aria-hidden": "true" }), _jsx("span", { children: trend.value })] }))] }));
}
