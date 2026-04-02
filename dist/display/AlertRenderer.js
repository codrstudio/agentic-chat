import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert.js";
const VARIANT_CONFIG = {
    info: { Icon: Info, className: "text-blue-600 dark:text-blue-400 *:[svg]:text-blue-600 dark:*:[svg]:text-blue-400 border-blue-500/50" },
    warning: { Icon: AlertTriangle, className: "text-yellow-600 dark:text-yellow-400 *:[svg]:text-yellow-600 dark:*:[svg]:text-yellow-400 border-yellow-500/50" },
    error: { Icon: AlertCircle },
    success: { Icon: CheckCircle, className: "text-green-600 dark:text-green-400 *:[svg]:text-green-600 dark:*:[svg]:text-green-400 border-green-500/50" },
};
export function AlertRenderer({ variant = "info", title, message }) {
    const { Icon, className } = VARIANT_CONFIG[variant];
    return (_jsxs(Alert, { variant: variant === "error" ? "destructive" : "default", className: className, children: [_jsx(Icon, {}), title && _jsx(AlertTitle, { children: title }), _jsx(AlertDescription, { children: message })] }));
}
