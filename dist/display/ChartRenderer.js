import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, } from "recharts";
import { Card } from "../ui/card";
const CHART_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];
const AXIS_PROPS = {
    stroke: "var(--border)",
    tick: { fill: "var(--muted-foreground)", fontSize: 12 },
};
const TOOLTIP_STYLE = {
    contentStyle: {
        background: "var(--card)",
        border: "1px solid var(--border)",
        color: "var(--card-foreground)",
        borderRadius: "0.375rem",
        fontSize: "0.75rem",
    },
};
function formatValue(value, format) {
    if (!format)
        return String(value);
    const locale = format.locale ?? "pt-BR";
    const prefix = format.prefix ?? "";
    const suffix = format.suffix ?? "";
    if (prefix.includes("R$") || prefix.includes("$") || prefix.includes("€")) {
        const currencyMap = {
            "R$": "BRL",
            "$": "USD",
            "€": "EUR",
        };
        const currency = Object.keys(currencyMap).find(k => prefix.includes(k));
        if (currency) {
            return new Intl.NumberFormat(locale, { style: "currency", currency: currencyMap[currency] }).format(value);
        }
    }
    if (suffix.includes("%")) {
        return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }).format(value / 100);
    }
    const formatted = new Intl.NumberFormat(locale).format(value);
    return `${prefix}${formatted}${suffix}`;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeTooltipFormatter(format) {
    return (value) => [
        typeof value === "number" ? formatValue(value, format) : String(value ?? ""),
        "",
    ];
}
export function ChartRenderer({ type, title, data, format }) {
    const chartData = data.map((d) => ({ name: d.label, value: d.value, color: d.color }));
    const tooltipFormatter = makeTooltipFormatter(format);
    const sharedProps = {
        data: chartData,
        margin: { top: 4, right: 8, left: 8, bottom: 4 },
    };
    return (_jsxs(Card, { className: "p-4", children: [title && _jsx("p", { className: "text-sm font-medium text-foreground mb-4", children: title }), _jsx("div", { className: "min-h-[200px]", children: _jsx(ResponsiveContainer, { width: "100%", height: 200, children: renderChart(type, chartData, sharedProps, tooltipFormatter) }) })] }));
}
function renderChart(type, data, sharedProps, tooltipFormatter) {
    switch (type) {
        case "bar":
            return (_jsxs(BarChart, { ...sharedProps, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", ...AXIS_PROPS }), _jsx(YAxis, { width: 48, ...AXIS_PROPS }), _jsx(Tooltip, { formatter: tooltipFormatter, ...TOOLTIP_STYLE }), _jsx(Bar, { dataKey: "value", radius: [4, 4, 0, 0], children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color ?? CHART_COLORS[index % CHART_COLORS.length] }, index))) })] }));
        case "line":
            return (_jsxs(LineChart, { ...sharedProps, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", ...AXIS_PROPS }), _jsx(YAxis, { width: 48, ...AXIS_PROPS }), _jsx(Tooltip, { formatter: tooltipFormatter, ...TOOLTIP_STYLE }), _jsx(Line, { type: "monotone", dataKey: "value", stroke: CHART_COLORS[0], strokeWidth: 2, dot: { r: 4, fill: CHART_COLORS[0] } })] }));
        case "area":
            return (_jsxs(AreaChart, { ...sharedProps, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", ...AXIS_PROPS }), _jsx(YAxis, { width: 48, ...AXIS_PROPS }), _jsx(Tooltip, { formatter: tooltipFormatter, ...TOOLTIP_STYLE }), _jsx(Area, { type: "monotone", dataKey: "value", stroke: CHART_COLORS[0], fill: CHART_COLORS[0], fillOpacity: 0.2, strokeWidth: 2 })] }));
        case "pie":
            return (_jsxs(PieChart, { children: [_jsx(Tooltip, { formatter: tooltipFormatter, ...TOOLTIP_STYLE }), _jsx(Pie, { data: data, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: "70%", label: ({ name }) => name, labelLine: { stroke: "var(--muted-foreground)" }, children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color ?? CHART_COLORS[index % CHART_COLORS.length] }, index))) })] }));
        case "donut":
            return (_jsxs(PieChart, { children: [_jsx(Tooltip, { formatter: tooltipFormatter, ...TOOLTIP_STYLE }), _jsx(Pie, { data: data, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", innerRadius: "40%", outerRadius: "70%", label: ({ name }) => name, labelLine: { stroke: "var(--muted-foreground)" }, children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color ?? CHART_COLORS[index % CHART_COLORS.length] }, index))) })] }));
    }
}
