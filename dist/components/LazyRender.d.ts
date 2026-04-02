import { type ReactNode } from "react";
interface LazyRenderProps {
    children: ReactNode;
    minHeight?: number;
    rootMargin?: string;
}
export declare function LazyRender({ children, minHeight, rootMargin }: LazyRenderProps): import("react/jsx-runtime").JSX.Element;
export {};
