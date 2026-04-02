import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card.js";
import { Badge } from "../ui/badge.js";
import { Button } from "../ui/button.js";
import { cn } from "../lib/utils.js";
function StarRating({ score, count }) {
    const fullStars = Math.floor(score);
    const hasHalf = score - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    return (_jsxs("div", { className: "flex items-center gap-0.5 text-primary", "aria-label": `${score} de 5 estrelas (${count} avaliações)`, children: [Array.from({ length: fullStars }).map((_, i) => (_jsx(Star, { size: 14, fill: "currentColor" }, `f${i}`))), hasHalf && _jsx(Star, { size: 14, fill: "none" }), Array.from({ length: emptyStars }).map((_, i) => (_jsx(Star, { size: 14, fill: "none", className: "text-muted-foreground" }, `e${i}`))), _jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: ["(", count, ")"] })] }));
}
function formatMoney(value, currency = "BRL") {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
}
export function ProductCardRenderer({ title, image, price, originalPrice, rating, badges, url, description, }) {
    const [imgError, setImgError] = useState(false);
    const discount = price && originalPrice && originalPrice.value > price.value
        ? Math.round(((originalPrice.value - price.value) / originalPrice.value) * 100)
        : null;
    return (_jsxs(Card, { className: "overflow-hidden w-fit max-w-sm", children: [image && !imgError && (_jsxs("div", { className: "relative", children: [_jsx("img", { src: image, alt: title, className: cn("w-full aspect-video object-cover"), loading: "lazy", decoding: "async", onError: () => setImgError(true) }), discount !== null && (_jsxs(Badge, { variant: "destructive", className: "absolute top-2 right-2", children: ["-", discount, "%"] }))] })), _jsxs(CardContent, { className: "p-4 space-y-2", children: [badges && badges.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1", children: badges.map((b, i) => (_jsx(Badge, { variant: "secondary", children: b.label }, i))) })), _jsx(CardTitle, { className: "text-sm", children: title }), description && (_jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: description })), rating && _jsx(StarRating, { score: rating.score, count: rating.count }), price && (_jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("span", { className: "text-lg font-bold", children: formatMoney(price.value, price.currency) }), originalPrice && (_jsx("span", { className: "text-sm text-muted-foreground line-through", children: formatMoney(originalPrice.value, originalPrice.currency) }))] })), url && (_jsx(Button, { className: "w-full", size: "sm", asChild: true, children: _jsx("a", { href: url, target: "_blank", rel: "noopener noreferrer", children: "Ver produto" }) }))] })] }));
}
