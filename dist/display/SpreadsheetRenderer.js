import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea, ScrollBar } from "../ui/scroll-area.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table.js";
import { cn } from "../lib/utils.js";
function formatCell(value, colIndex, moneyColumns = [], percentColumns = []) {
    if (value === null || value === undefined)
        return "";
    if (typeof value === "number") {
        if (moneyColumns.includes(colIndex)) {
            return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
        }
        if (percentColumns.includes(colIndex)) {
            return new Intl.NumberFormat("pt-BR", {
                style: "percent",
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            }).format(value / 100);
        }
        return new Intl.NumberFormat("pt-BR").format(value);
    }
    return String(value);
}
export function SpreadsheetRenderer({ title, headers, rows, format }) {
    const moneyColumns = format?.moneyColumns ?? [];
    const percentColumns = format?.percentColumns ?? [];
    return (_jsxs("div", { className: "space-y-2", children: [title && _jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }), _jsxs(ScrollArea, { className: "w-full", children: [_jsxs(Table, { "aria-readonly": "true", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "text-muted-foreground font-normal text-center w-10", "aria-label": "Linha" }), headers.map((h, i) => (_jsx(TableHead, { className: "font-semibold", children: h }, i)))] }) }), _jsx(TableBody, { children: rows.map((row, ri) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "text-center text-xs text-muted-foreground select-none", children: ri + 1 }), row.map((cell, ci) => {
                                            const isMoney = moneyColumns.includes(ci);
                                            const isPercent = percentColumns.includes(ci);
                                            const isNumber = typeof cell === "number";
                                            return (_jsx(TableCell, { className: cn((isMoney || isPercent || isNumber) && "text-right font-mono text-sm"), children: formatCell(cell, ci, moneyColumns, percentColumns) }, ci));
                                        })] }, ri))) })] }), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
}
