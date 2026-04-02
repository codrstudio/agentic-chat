"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pencil, Star } from "lucide-react";
import { cn } from "../lib/utils.js";
import { Input } from "../ui/input.js";
import { formatRelativeTime } from "./utils.js";
function ConversationListItem({ conversation, agentLabel, isActive, isRenaming, renameValue = "", onRenameChange, onRenameCommit, onRenameCancel, onStartRename, onToggleStar, onClick, badgesExtra, className, }) {
    const handleRenameKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onRenameCommit?.();
        }
        else if (e.key === "Escape") {
            e.preventDefault();
            onRenameCancel?.();
        }
    };
    return (_jsxs("div", { className: cn("group relative flex items-center gap-1 rounded-md px-1 py-1 hover:bg-accent", isActive && "bg-accent", className), children: [_jsx("button", { className: cn("shrink-0 rounded p-0.5 transition-colors", conversation.starred
                    ? "text-yellow-500 hover:text-yellow-400"
                    : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-yellow-500"), onClick: onToggleStar, "aria-label": conversation.starred ? "Unstar conversation" : "Star conversation", tabIndex: -1, children: _jsx(Star, { className: cn("size-3.5", conversation.starred && "fill-yellow-500") }) }), isRenaming ? (_jsx(Input, { className: "h-6 flex-1 px-1 py-0 text-sm", value: renameValue, onChange: (e) => onRenameChange?.(e.target.value), onKeyDown: handleRenameKeyDown, onBlur: onRenameCancel, autoFocus: true })) : (_jsxs("button", { className: "flex min-w-0 flex-1 flex-col items-start text-left", onClick: onClick, children: [_jsxs("div", { className: "flex w-full items-center gap-1", children: [agentLabel && (_jsx("span", { className: "shrink-0 rounded bg-secondary px-1 py-0 text-[10px] text-secondary-foreground", children: agentLabel })), badgesExtra, _jsx("span", { className: "ml-auto shrink-0 text-[10px] text-muted-foreground", children: formatRelativeTime(conversation.updatedAt) })] }), _jsx("span", { className: "w-full truncate text-sm text-foreground", children: conversation.title ?? "Untitled" })] })), !isRenaming && (_jsx("button", { className: "shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-colors group-hover:opacity-100 hover:text-foreground", onClick: onStartRename, "aria-label": "Rename conversation", tabIndex: -1, children: _jsx(Pencil, { className: "size-3.5" }) }))] }));
}
export { ConversationListItem };
