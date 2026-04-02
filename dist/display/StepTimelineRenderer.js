import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils";
import { Badge } from "../ui/badge";
const STATUS_CIRCLE = {
    completed: "bg-primary text-primary-foreground",
    current: "bg-primary/20 border border-primary",
    pending: "bg-muted text-muted-foreground",
};
const STATUS_TITLE = {
    completed: "text-foreground",
    current: "text-primary",
    pending: "text-muted-foreground",
};
export function StepTimelineRenderer({ title, steps, orientation }) {
    const isVertical = orientation !== "horizontal";
    return (_jsxs("div", { className: cn("flex", isVertical ? "flex-col gap-0" : "flex-row items-start gap-0"), children: [title && (_jsx("p", { className: "text-sm font-medium text-foreground mb-3", children: title })), steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const { status } = step;
                return (_jsxs("div", { className: cn("flex", isVertical ? "flex-row gap-3" : "flex-col items-center gap-2 flex-1"), children: [_jsxs("div", { className: cn("flex", isVertical ? "flex-col items-center" : "flex-row items-center"), children: [_jsx("div", { className: cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", STATUS_CIRCLE[status]), children: _jsx(Badge, { variant: "secondary", className: "w-5 h-5 flex items-center justify-center rounded-full p-0 text-[10px] font-semibold border-0 bg-transparent text-inherit", children: index + 1 }) }), !isLast && (_jsx("div", { className: cn(isVertical ? "w-px h-6 bg-border" : "h-px w-full bg-border flex-1") }))] }), _jsxs("div", { className: cn("pb-4 flex-1 min-w-0", isLast && "pb-0", !isVertical && "text-center"), children: [_jsx("p", { className: cn("text-sm font-medium leading-none", STATUS_TITLE[status]), children: step.title }), step.description && (_jsx("p", { className: "text-xs text-muted-foreground mt-1", children: step.description }))] })] }, index));
            })] }));
}
