"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../ui/button.js";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../ui/dialog.js";
function DeleteDialog({ open, onOpenChange, onConfirm, isPending, title = "Delete conversation", description = "This conversation will be permanently removed.", cancelLabel = "Cancel", confirmLabel = "Delete", }) {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-sm", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), disabled: isPending, children: cancelLabel }), _jsx(Button, { variant: "destructive", onClick: onConfirm, disabled: isPending, children: confirmLabel })] })] }) }));
}
export { DeleteDialog };
