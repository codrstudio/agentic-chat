import * as React from "react";
interface ConversationBarProps {
    title?: string;
    agentLabel?: string;
    isLoading?: boolean;
    onRename?: (title: string) => void;
    onExport?: () => void;
    onDelete?: () => void;
    onBack?: () => void;
    renameOpen?: boolean;
    onRenameOpenChange?: (open: boolean) => void;
    deleteOpen?: boolean;
    onDeleteOpenChange?: (open: boolean) => void;
    isPendingRename?: boolean;
    isPendingDelete?: boolean;
    renameLabel?: string;
    exportLabel?: string;
    deleteLabel?: string;
    untitledLabel?: string;
    actionsExtra?: React.ReactNode;
    menuItemsExtra?: React.ReactNode;
    afterBar?: React.ReactNode;
    className?: string;
}
declare function ConversationBar({ title, agentLabel, isLoading, onRename, onExport, onDelete, onBack, renameOpen: renameOpenProp, onRenameOpenChange, deleteOpen: deleteOpenProp, onDeleteOpenChange, isPendingRename, isPendingDelete, renameLabel, exportLabel, deleteLabel, untitledLabel, actionsExtra, menuItemsExtra, afterBar, className, }: ConversationBarProps): import("react/jsx-runtime").JSX.Element;
export { ConversationBar };
export type { ConversationBarProps };
