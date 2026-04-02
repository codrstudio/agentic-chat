interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isPending?: boolean;
    title?: string;
    description?: string;
    cancelLabel?: string;
    confirmLabel?: string;
}
declare function DeleteDialog({ open, onOpenChange, onConfirm, isPending, title, description, cancelLabel, confirmLabel, }: DeleteDialogProps): import("react/jsx-runtime").JSX.Element;
export { DeleteDialog };
export type { DeleteDialogProps };
