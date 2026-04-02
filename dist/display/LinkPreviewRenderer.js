import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Globe } from "lucide-react";
import { Card } from "../ui/card";
function getDomain(url, domainProp) {
    if (domainProp)
        return domainProp;
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    }
    catch {
        return url;
    }
}
export function LinkPreviewRenderer({ url, title, description, image, favicon, domain, }) {
    const [imgError, setImgError] = useState(false);
    const [faviconError, setFaviconError] = useState(false);
    const displayDomain = getDomain(url, domain);
    return (_jsx("a", { href: url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Link: ${title}`, children: _jsxs(Card, { className: "overflow-hidden hover:bg-muted/50 transition-colors", children: [image && !imgError && (_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: image, alt: title, className: "w-full h-full object-cover", loading: "lazy", decoding: "async", onError: () => setImgError(true) }) })), _jsxs("div", { className: "p-3 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [favicon && !faviconError ? (_jsx("img", { src: favicon, alt: "", className: "w-3 h-3 rounded-sm", onError: () => setFaviconError(true), "aria-hidden": "true" })) : (_jsx(Globe, { size: 12, "aria-hidden": "true", className: "shrink-0" })), _jsx("span", { children: displayDomain })] }), _jsx("p", { className: "font-medium text-foreground text-sm", children: title }), description && (_jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: description }))] })] }) }));
}
