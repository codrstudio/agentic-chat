interface RenameDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    value: string;
    onValueChange: (value: string) => void;
    onConfirm: () => void;
    isPending?: boolean;
    title?: string;
    placeholder?: string;
    cancelLabel?: string;
    confirmLabel?: string;
}
declare function RenameDialog({ open, onOpenChange, value, onValueChange, onConfirm, isPending, title, placeholder, cancelLabel, confirmLabel, }: RenameDialogProps): import("react/jsx-runtime").JSX.Element;
export { RenameDialog };
export type { RenameDialogProps };
