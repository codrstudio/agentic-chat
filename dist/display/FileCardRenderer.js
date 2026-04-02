import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Download, File, FileCode, FileImage, FileMinus, FileText, FileVideo, Music, } from "lucide-react";
import { Button } from "../ui/button.js";
import { Card } from "../ui/card.js";
function getFileIcon(type) {
    const mime = type.toLowerCase();
    if (mime.startsWith("image/"))
        return FileImage;
    if (mime.startsWith("video/"))
        return FileVideo;
    if (mime.startsWith("audio/"))
        return Music;
    if (mime === "application/pdf" || mime === "text/plain" || mime.includes("document"))
        return FileText;
    if (mime.includes("spreadsheet") || mime.includes("csv"))
        return FileMinus;
    if (mime.includes("javascript") || mime.includes("typescript") || mime.includes("json") || mime.includes("html") || mime.includes("css") || mime.includes("xml"))
        return FileCode;
    return File;
}
function formatSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
export function FileCardRenderer({ name, type, size, url }) {
    const Icon = getFileIcon(type);
    return (_jsxs(Card, { className: "flex items-center gap-3 p-3", children: [_jsx("div", { className: "shrink-0 text-primary", children: _jsx(Icon, { className: "h-8 w-8" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-sm truncate", children: name }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [type, size !== undefined && ` · ${formatSize(size)}`] })] }), url && (_jsx(Button, { variant: "ghost", size: "icon", asChild: true, children: _jsx("a", { href: url, download: name, "aria-label": `Baixar ${name}`, children: _jsx(Download, { className: "h-4 w-4" }) }) }))] }));
}
