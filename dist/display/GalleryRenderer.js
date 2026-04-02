import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "../lib/utils.js";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog.js";
export function GalleryRenderer({ title, images }) {
    const [lightboxIdx, setLightboxIdx] = useState(null);
    const activeImage = lightboxIdx !== null ? images[lightboxIdx] : null;
    return (_jsxs("div", { className: "space-y-2", children: [title && _jsx("h3", { className: "text-sm font-medium text-foreground", children: title }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: images.map((img, i) => (_jsxs("button", { className: "relative group cursor-pointer rounded-md overflow-hidden", onClick: () => setLightboxIdx(i), "aria-label": img.alt ?? `Imagem ${i + 1}`, children: [_jsx("img", { src: img.url, alt: img.alt ?? "", className: "w-full h-full object-cover aspect-square", loading: "lazy" }), _jsx("div", { className: "absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity", children: _jsx(ZoomIn, { className: "h-5 w-5 text-foreground" }) }), img.caption && (_jsx("p", { className: "absolute bottom-0 left-0 right-0 text-sm text-muted-foreground bg-background/80 px-2 py-1 truncate", children: img.caption }))] }, i))) }), _jsx(Dialog, { open: lightboxIdx !== null, onOpenChange: (open) => { if (!open)
                    setLightboxIdx(null); }, children: _jsxs(DialogContent, { className: cn("max-w-4xl p-0 bg-background/95"), children: [_jsx(DialogTitle, { className: "sr-only", children: activeImage?.alt ?? "Visualizador de imagem" }), activeImage && (_jsxs("div", { className: "flex flex-col", children: [_jsx("img", { src: activeImage.url, alt: activeImage.alt ?? "", className: "w-full max-h-[80vh] object-contain" }), activeImage.caption && (_jsx("p", { className: "text-sm text-muted-foreground px-4 py-3", children: activeImage.caption }))] }))] }) })] }));
}
