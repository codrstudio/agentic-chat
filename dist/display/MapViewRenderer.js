import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MapPin } from "lucide-react";
import { Card } from "../ui/card.js";
import { Separator } from "../ui/separator.js";
function buildOsmUrl(pins, zoom) {
    if (pins.length === 0) {
        return `https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik`;
    }
    const lat = pins.reduce((acc, p) => acc + p.lat, 0) / pins.length;
    const lng = pins.reduce((acc, p) => acc + p.lng, 0) / pins.length;
    const firstPin = pins[0];
    const markerParam = pins.length === 1
        ? `&mlat=${firstPin.lat}&mlon=${firstPin.lng}`
        : "";
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&layer=mapnik&zoom=${zoom}${markerParam}`;
}
export function MapViewRenderer({ title, pins, zoom }) {
    const osmUrl = buildOsmUrl(pins, zoom);
    return (_jsxs(Card, { className: "overflow-hidden", children: [title && (_jsx("div", { className: "px-4 py-3", children: _jsx("h3", { className: "font-medium text-sm text-foreground", children: title }) })), _jsxs("div", { className: "relative aspect-video bg-muted text-muted-foreground overflow-hidden", children: [_jsx("iframe", { src: osmUrl, className: "w-full h-full border-0", title: title ?? "Mapa OpenStreetMap", loading: "lazy", referrerPolicy: "no-referrer", sandbox: "allow-scripts allow-same-origin" }), _jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center opacity-10", children: _jsx(MapPin, { className: "h-10 w-10" }) })] }), pins.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Separator, {}), _jsx("ul", { className: "p-3 space-y-2", "aria-label": "Locais no mapa", children: pins.map((pin, i) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 shrink-0 text-primary mt-0.5", "aria-hidden": "true" }), _jsxs("span", { className: "flex flex-col min-w-0", children: [pin.label && (_jsx("span", { className: "font-medium text-sm text-foreground", children: pin.label })), pin.address && (_jsx("span", { className: "text-xs text-muted-foreground", children: pin.address })), !pin.label && !pin.address && (_jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [pin.lat.toFixed(4), ", ", pin.lng.toFixed(4)] }))] })] }, i))) })] }))] }));
}
