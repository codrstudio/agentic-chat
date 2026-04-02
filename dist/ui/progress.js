import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils.js";
const Progress = React.forwardRef(({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    return (_jsx("div", { ref: ref, role: "progressbar", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": max, className: cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className), ...props, children: _jsx("div", { className: "h-full bg-primary transition-all", style: { width: `${percentage}%` } }) }));
});
Progress.displayName = "Progress";
export { Progress };
