import * as React from "react";
interface CollapsibleGroupProps {
    label: string;
    icon?: React.ReactNode;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}
declare function CollapsibleGroup({ label, icon, open, onToggle, children }: CollapsibleGroupProps): import("react/jsx-runtime").JSX.Element;
export { CollapsibleGroup };
export type { CollapsibleGroupProps };
