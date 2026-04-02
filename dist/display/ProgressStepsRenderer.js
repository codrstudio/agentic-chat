import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Circle, Clock } from "lucide-react";
import { Progress } from "../ui/progress.js";
import { Badge } from "../ui/badge.js";
import { cn } from "../lib/utils.js";
export function ProgressStepsRenderer({ title, steps }) {
    const completed = steps.filter((s) => s.status === "completed").length;
    const percentage = steps.length > 0 ? Math.round((completed / steps.length) * 100) : 0;
    return (_jsxs("div", { className: "space-y-3", children: [title && _jsx("p", { className: "font-medium text-foreground", children: title }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Progress, { value: percentage, className: "flex-1" }), _jsxs("span", { className: "text-sm text-muted-foreground tabular-nums", children: [percentage, "%"] })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [completed, " de ", steps.length, " conclu\u00EDdos"] }), _jsx("ol", { className: "space-y-2", children: steps.map((step, index) => {
                    const isCompleted = step.status === "completed";
                    const isPending = step.status === "pending";
                    return (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { "aria-hidden": "true", className: cn("mt-0.5 shrink-0", isCompleted ? "text-primary" : "text-muted-foreground"), children: isCompleted ? (_jsx(Check, { size: 16 })) : isPending ? (_jsx(Circle, { size: 16 })) : (_jsx(Clock, { size: 16 })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: cn("text-sm", isCompleted ? "text-foreground" : "text-muted-foreground"), children: step.label }), step.description && (_jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: step.description }))] }), _jsx(Badge, { variant: "secondary", className: "shrink-0 text-xs", children: index + 1 })] }, index));
                }) })] }));
}
