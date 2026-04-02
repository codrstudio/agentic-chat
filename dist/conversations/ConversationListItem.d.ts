import * as React from "react";
import type { Conversation } from "./types.js";
interface ConversationListItemProps {
    conversation: Conversation;
    agentLabel?: string;
    isActive?: boolean;
    isRenaming?: boolean;
    renameValue?: string;
    onRenameChange?: (value: string) => void;
    onRenameCommit?: () => void;
    onRenameCancel?: () => void;
    onStartRename?: (e: React.MouseEvent) => void;
    onToggleStar?: (e: React.MouseEvent) => void;
    onClick?: () => void;
    badgesExtra?: React.ReactNode;
    className?: string;
}
declare function ConversationListItem({ conversation, agentLabel, isActive, isRenaming, renameValue, onRenameChange, onRenameCommit, onRenameCancel, onStartRename, onToggleStar, onClick, badgesExtra, className, }: ConversationListItemProps): import("react/jsx-runtime").JSX.Element;
export { ConversationListItem };
export type { ConversationListItemProps };
