import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "../lib/utils";
function formatPrice(value, currency) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
}
export function CarouselRenderer({ title, items }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const onSelect = useCallback(() => {
        if (!emblaApi)
            return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);
    useEffect(() => {
        if (!emblaApi)
            return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    return (_jsxs("div", { className: "flex flex-col gap-3", children: [title && _jsx("p", { className: "text-sm font-medium text-foreground", children: title }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", className: "rounded-full shrink-0", onClick: scrollPrev, disabled: !canScrollPrev, "aria-label": "Anterior", type: "button", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx("div", { className: "overflow-hidden flex-1", ref: emblaRef, children: _jsx("div", { className: "flex", children: items.map((item, index) => (_jsx("div", { className: "flex-[0_0_80%] min-w-0 pl-3 first:pl-0", children: item.url ? (_jsx("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", className: "block", children: _jsx(CarouselCard, { item: item }) })) : (_jsx(CarouselCard, { item: item })) }, index))) }) }), _jsx(Button, { variant: "outline", size: "icon", className: "rounded-full shrink-0", onClick: scrollNext, disabled: !canScrollNext, "aria-label": "Pr\u00F3ximo", type: "button", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] }), items.length > 1 && (_jsx("div", { className: "flex items-center justify-center gap-1.5", role: "tablist", "aria-label": "Slides", children: items.map((_, index) => (_jsx("button", { className: cn("w-2 h-2 rounded-full transition-colors", index === selectedIndex ? "bg-primary" : "bg-muted"), onClick: () => emblaApi?.scrollTo(index), role: "tab", "aria-selected": index === selectedIndex, "aria-label": `Slide ${index + 1}`, type: "button" }, index))) }))] }));
}
function CarouselCard({ item }) {
    return (_jsxs(Card, { className: "overflow-hidden", children: [item.image && (_jsx("div", { className: "aspect-video overflow-hidden", children: _jsx("img", { src: item.image, alt: item.title, loading: "lazy", className: "w-full h-full object-cover" }) })), _jsxs(CardContent, { className: "p-3 space-y-1", children: [_jsx("p", { className: "font-medium text-sm text-foreground", children: item.title }), item.subtitle && (_jsx("p", { className: "text-xs text-muted-foreground", children: item.subtitle })), item.price && (_jsx("p", { className: "text-sm font-bold text-foreground", children: formatPrice(item.price.value, item.price.currency) })), item.badges && item.badges.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1 pt-1", children: item.badges.map((badge, i) => (_jsx(Badge, { variant: badge.variant === "destructive" ? "destructive" : badge.variant === "secondary" ? "secondary" : "default", children: badge.label }, i))) }))] })] }));
}
