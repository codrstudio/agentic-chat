import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table.js";
import { cn } from "../lib/utils.js";
function formatMoney(value, currency = "BRL") {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
}
export function ComparisonTableRenderer({ title, items, attributes }) {
    const [bestIdx, setBestIdx] = useState(null);
    // Auto-detect best value by lowest price if no manual selection
    const lowestPriceIdx = items.reduce((acc, item, i) => {
        if (!item.price)
            return acc;
        if (acc === null)
            return i;
        const best = items[acc]?.price;
        return best && item.price.value < best.value ? i : acc;
    }, null);
    const highlightIdx = bestIdx ?? lowestPriceIdx;
    return (_jsxs("div", { className: "space-y-2", children: [title && _jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }), _jsxs(ScrollArea, { className: "w-full", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "font-semibold text-center", children: "Atributo" }), items.map((item, i) => (_jsx(TableHead, { className: cn("font-semibold text-center", i === highlightIdx && "bg-muted"), children: _jsxs("button", { className: "flex flex-col items-center gap-0.5 w-full cursor-pointer hover:opacity-80", onClick: () => setBestIdx(i === bestIdx ? null : i), title: "Marcar como melhor", children: [i === highlightIdx && (_jsx(CheckCircle, { className: "h-3.5 w-3.5 text-primary" })), _jsx("span", { className: "font-semibold", children: item.title }), item.price && (_jsx("span", { className: "text-xs text-muted-foreground font-normal", children: formatMoney(item.price.value, item.price.currency) }))] }) }, i)))] }) }), _jsx(TableBody, { children: attributes && attributes.length > 0 ? (attributes.map((attr, ri) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: attr.label }), items.map((item, ci) => {
                                            const val = item[attr.key];
                                            return (_jsx(TableCell, { className: cn("text-center", ci === highlightIdx && "bg-muted/50"), children: val === true ? "✓" : val === false ? "✗" : val != null ? String(val) : "—" }, ci));
                                        })] }, ri)))) : (_jsxs(_Fragment, { children: [items.some((i) => i.rating) && (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: "Avalia\u00E7\u00E3o" }), items.map((item, ci) => (_jsx(TableCell, { className: cn("text-center", ci === highlightIdx && "bg-muted/50"), children: item.rating ? `${item.rating.score}/5 (${item.rating.count})` : "—" }, ci)))] })), items.some((i) => i.description) && (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: "Descri\u00E7\u00E3o" }), items.map((item, ci) => (_jsx(TableCell, { className: cn("text-center", ci === highlightIdx && "bg-muted/50"), children: item.description ?? "—" }, ci)))] }))] })) })] }), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
}
