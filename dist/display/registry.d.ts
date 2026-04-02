import type { ComponentType } from "react";
export type DisplayActionName = "metric" | "price" | "alert" | "choices" | "table" | "spreadsheet" | "comparison" | "carousel" | "gallery" | "sources" | "product" | "link" | "file" | "image" | "chart" | "map" | "code" | "progress" | "steps";
export type DisplayRendererMap = Partial<Record<string, ComponentType<any>>>;
export declare const defaultDisplayRenderers: Record<DisplayActionName, ComponentType<any>>;
export declare function resolveDisplayRenderer(action: string, overrides?: DisplayRendererMap): ComponentType<any> | null;
