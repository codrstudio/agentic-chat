"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ArrowLeft, Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge.js";
import { Button } from "../ui/button.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../ui/dropdown-menu.js";
import { Skeleton } from "../ui/skeleton.js";
import { cn } from "../lib/utils.js";
import { DeleteDialog } from "./DeleteDialog.js";
import { RenameDialog } from "./RenameDialog.js";
function ConversationBar({ title, agentLabel, isLoading, onRename, onExport, onDelete, onBack, renameOpen: renameOpenProp, onRenameOpenChange, deleteOpen: deleteOpenProp, onDeleteOpenChange, isPendingRename, isPendingDelete, renameLabel = "Rename", exportLabel = "Export", deleteLabel = "Delete", untitledLabel = "Untitled", actionsExtra, menuItemsExtra, afterBar, className, }) {
    // Internal dialog state for uncontrolled mode
    const [internalRenameOpen, setInternalRenameOpen] = React.useState(false);
    const [internalDeleteOpen, setInternalDeleteOpen] = React.useState(false);
    const [renameValue, setRenameValue] = React.useState("");
    const isControlledRename = renameOpenProp !== undefined && onRenameOpenChange !== undefined;
    const isControlledDelete = deleteOpenProp !== undefined && onDeleteOpenChange !== undefined;
    const renameOpen = isControlledRename ? renameOpenProp : internalRenameOpen;
    const deleteOpen = isControlledDelete ? deleteOpenProp : internalDeleteOpen;
    const setRenameOpen = (open) => {
        if (isControlledRename) {
            onRenameOpenChange(open);
        }
        else {
            setInternalRenameOpen(open);
        }
    };
    const setDeleteOpen = (open) => {
        if (isControlledDelete) {
            onDeleteOpenChange(open);
        }
        else {
            setInternalDeleteOpen(open);
        }
    };
    const handleRenameClick = () => {
        setRenameValue(title ?? "");
        setRenameOpen(true);
    };
    const handleRenameConfirm = () => {
        if (renameValue.trim()) {
            onRename?.(renameValue.trim());
        }
        setRenameOpen(false);
    };
    const handleDeleteConfirm = () => {
        onDelete?.();
        setDeleteOpen(false);
    };
    return (_jsxs("div", { className: cn("flex flex-col", className), children: [_jsxs("div", { className: "flex items-center gap-2 border-b bg-background px-3 py-2", children: [onBack && (_jsx(Button, { variant: "ghost", size: "icon", className: "size-8 shrink-0", onClick: onBack, children: _jsx(ArrowLeft, { className: "size-4" }) })), _jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [isLoading ? (_jsx(Skeleton, { className: "h-5 w-40" })) : (_jsx("span", { className: "truncate text-sm font-medium", children: title ?? untitledLabel })), agentLabel && (_jsx(Badge, { variant: "secondary", className: "shrink-0 text-xs", children: agentLabel }))] }), _jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [actionsExtra, _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "size-8", children: _jsx(MoreHorizontal, { className: "size-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: handleRenameClick, children: [_jsx(Pencil, { className: "mr-2 size-4" }), renameLabel] }), _jsxs(DropdownMenuItem, { onClick: onExport, children: [_jsx(Download, { className: "mr-2 size-4" }), exportLabel] }), menuItemsExtra, _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-destructive focus:text-destructive", onClick: () => setDeleteOpen(true), children: [_jsx(Trash2, { className: "mr-2 size-4" }), deleteLabel] })] })] })] })] }), afterBar, _jsx(RenameDialog, { open: renameOpen, onOpenChange: setRenameOpen, value: renameValue, onValueChange: setRenameValue, onConfirm: handleRenameConfirm, isPending: isPendingRename }), _jsx(DeleteDialog, { open: deleteOpen, onOpenChange: setDeleteOpen, onConfirm: handleDeleteConfirm, isPending: isPendingDelete })] }));
}
export { ConversationBar };
