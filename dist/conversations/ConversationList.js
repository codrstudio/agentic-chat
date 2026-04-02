"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MessageSquare, Plus, Search } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils.js";
import { Button } from "../ui/button.js";
import { Input } from "../ui/input.js";
import { ScrollArea } from "../ui/scroll-area.js";
import { Skeleton } from "../ui/skeleton.js";
import { CollapsibleGroup } from "./CollapsibleGroup.js";
import { ConversationListItem } from "./ConversationListItem.js";
import { groupConversations } from "./utils.js";
function ConversationList({ conversations, activeId, isLoading = false, search = "", onSearchChange, searchPlaceholder = "Search...", favorites: favoritesProp, history: historyProp, favoritesLabel = "Favorites", historyLabel = "History", hasMore = false, onLoadMore, loadMoreLabel = "Load more", remainingCount, onSelect, onRename, onStar, onCreateRequest, getAgentLabel, headerExtra, filterExtra, itemBadgesExtra, emptyIcon, emptyTitle = "No conversations", emptyDescription = "Start a conversation to begin.", className, }) {
    const [renamingId, setRenamingId] = React.useState(null);
    const [renameValue, setRenameValue] = React.useState("");
    const [favoritesOpen, setFavoritesOpen] = React.useState(true);
    const [historyOpen, setHistoryOpen] = React.useState(true);
    const derived = React.useMemo(() => groupConversations(conversations), [conversations]);
    const favorites = favoritesProp ?? derived.favorites;
    const history = historyProp ?? derived.history;
    function handleStartRename(conv) {
        return (e) => {
            e.stopPropagation();
            setRenamingId(conv.id);
            setRenameValue(conv.title ?? "");
        };
    }
    function handleRenameCommit(id) {
        if (renameValue.trim()) {
            onRename?.(id, renameValue.trim());
        }
        setRenamingId(null);
        setRenameValue("");
    }
    function handleRenameCancel() {
        setRenamingId(null);
        setRenameValue("");
    }
    function renderItem(conv) {
        return (_jsx(ConversationListItem, { conversation: conv, agentLabel: getAgentLabel?.(conv.agentId), isActive: conv.id === activeId, isRenaming: renamingId === conv.id, renameValue: renameValue, onRenameChange: setRenameValue, onRenameCommit: () => handleRenameCommit(conv.id), onRenameCancel: handleRenameCancel, onStartRename: handleStartRename(conv), onToggleStar: (e) => {
                e.stopPropagation();
                onStar?.(conv.id, !conv.starred);
            }, onClick: () => onSelect?.(conv.id), badgesExtra: itemBadgesExtra?.(conv) }, conv.id));
    }
    const isEmpty = !isLoading && conversations.length === 0;
    return (_jsxs("div", { className: cn("flex h-full flex-col", className), children: [_jsxs("div", { className: "flex items-center gap-1 px-2 py-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { className: "h-8 pl-7 text-sm", placeholder: searchPlaceholder, value: search, onChange: (e) => onSearchChange?.(e.target.value) })] }), headerExtra, _jsx(Button, { variant: "ghost", size: "icon", className: "size-8 shrink-0", onClick: onCreateRequest, "aria-label": "New conversation", children: _jsx(Plus, { className: "size-4" }) })] }), filterExtra && _jsx("div", { className: "px-2 pb-2", children: filterExtra }), _jsx(ScrollArea, { className: "flex-1", children: _jsxs("div", { className: "px-2 pb-2", children: [isLoading && (_jsx("div", { className: "flex flex-col gap-2 pt-1", children: Array.from({ length: 8 }).map((_, i) => (_jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, i))) })), isEmpty && (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 py-12 text-center", children: [emptyIcon ?? _jsx(MessageSquare, { className: "size-10 text-muted-foreground/50" }), _jsx("p", { className: "text-sm font-medium text-foreground", children: emptyTitle }), _jsx("p", { className: "text-xs text-muted-foreground", children: emptyDescription })] })), !isLoading && !isEmpty && (_jsxs(_Fragment, { children: [favorites.length > 0 && (_jsx(CollapsibleGroup, { label: favoritesLabel, open: favoritesOpen, onToggle: () => setFavoritesOpen((v) => !v), children: _jsx("div", { className: "mt-0.5 flex flex-col gap-0.5", children: favorites.map(renderItem) }) })), history.length > 0 && (_jsxs(CollapsibleGroup, { label: historyLabel, open: historyOpen, onToggle: () => setHistoryOpen((v) => !v), children: [_jsx("div", { className: "mt-0.5 flex flex-col gap-0.5", children: history.map(renderItem) }), hasMore && (_jsxs("button", { className: "mt-1 w-full rounded-md py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground", onClick: onLoadMore, children: [loadMoreLabel, remainingCount != null && remainingCount > 0 && (_jsxs("span", { className: "ml-1 text-muted-foreground", children: ["(", remainingCount, " remaining)"] }))] }))] }))] }))] }) })] }));
}
export { ConversationList };
