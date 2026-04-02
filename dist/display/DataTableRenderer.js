import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table.js";
import { ScrollArea, ScrollBar } from "../ui/scroll-area.js";
import { Button } from "../ui/button.js";
import { Badge } from "../ui/badge.js";
function formatMoney(value, currency = "BRL") {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
}
function renderCellValue(value, type) {
    if (value == null)
        return "—";
    switch (type) {
        case "money":
            return typeof value === "number"
                ? formatMoney(value)
                : typeof value === "object" && value !== null && "value" in value
                    ? formatMoney(value.value, value.currency)
                    : String(value);
        case "image":
            return typeof value === "string" ? (_jsx("img", { src: value, alt: "", className: "rounded-sm max-h-12 object-cover", loading: "lazy", decoding: "async" })) : null;
        case "link":
            return typeof value === "string" ? (_jsx("a", { href: value, target: "_blank", rel: "noopener noreferrer", className: "text-primary underline underline-offset-2 hover:opacity-80", children: value })) : null;
        case "badge":
            return _jsx(Badge, { variant: "secondary", children: String(value) });
        default:
            return String(value);
    }
}
function compareValues(a, b, type) {
    if (a == null && b == null)
        return 0;
    if (a == null)
        return 1;
    if (b == null)
        return -1;
    if (type === "money") {
        const av = typeof a === "number" ? a : typeof a === "object" && a !== null && "value" in a ? a.value : 0;
        const bv = typeof b === "number" ? b : typeof b === "object" && b !== null && "value" in b ? b.value : 0;
        return av - bv;
    }
    if (type === "number") {
        return (Number(a) || 0) - (Number(b) || 0);
    }
    return String(a).localeCompare(String(b), "pt-BR");
}
export function DataTableRenderer({ title, columns, rows, sortable }) {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    function handleSort(key) {
        if (!sortable)
            return;
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        }
        else {
            setSortKey(key);
            setSortDir("asc");
        }
    }
    const sortedRows = sortKey
        ? [...rows].sort((a, b) => {
            const col = columns.find((c) => c.key === sortKey);
            const dir = sortDir === "asc" ? 1 : -1;
            return compareValues(a[sortKey], b[sortKey], col?.type ?? "text") * dir;
        })
        : rows;
    return (_jsxs("div", { className: "space-y-2", children: [title && _jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }), _jsxs(ScrollArea, { className: "w-full", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsx(TableRow, { children: columns.map((col) => (_jsx(TableHead, { className: col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left", children: sortable ? (_jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3 h-8 font-semibold", onClick: () => handleSort(col.key), "aria-sort": sortKey === col.key
                                                ? sortDir === "asc"
                                                    ? "ascending"
                                                    : "descending"
                                                : undefined, children: [col.label, sortKey === col.key ? (sortDir === "asc" ? (_jsx(ArrowUp, { className: "ml-1 h-3 w-3" })) : (_jsx(ArrowDown, { className: "ml-1 h-3 w-3" }))) : (_jsx(ArrowUpDown, { className: "ml-1 h-3 w-3" }))] })) : (col.label) }, col.key))) }) }), _jsx(TableBody, { children: sortedRows.map((row, ri) => (_jsx(TableRow, { children: columns.map((col) => (_jsx(TableCell, { className: col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left", children: renderCellValue(row[col.key], col.type) }, col.key))) }, ri))) })] }), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
}
