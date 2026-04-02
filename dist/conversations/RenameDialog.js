"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../ui/button.js";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "../ui/dialog.js";
import { Input } from "../ui/input.js";
function RenameDialog({ open, onOpenChange, value, onValueChange, onConfirm, isPending, title = "Rename conversation", placeholder = "Conversation title", cancelLabel = "Cancel", confirmLabel = "Save", }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && value.trim() && !isPending) {
            e.preventDefault();
            onConfirm();
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-sm", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: title }) }), _jsx(Input, { value: value, onChange: (e) => onValueChange(e.target.value), onKeyDown: handleKeyDown, placeholder: placeholder, autoFocus: true }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), disabled: isPending, children: cancelLabel }), _jsx(Button, { onClick: onConfirm, disabled: !value.trim() || isPending, children: confirmLabel })] })] }) }));
}
export { RenameDialog };
