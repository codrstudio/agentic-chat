import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../ui/button.js";
import { Card } from "../ui/card.js";
import { cn } from "../lib/utils.js";
export function ChoiceButtonsRenderer({ question, choices, layout, onChoiceSelect, }) {
    const [selected, setSelected] = useState(null);
    function handleSelect(id) {
        setSelected(id);
        onChoiceSelect?.(id);
    }
    return (_jsxs("div", { className: "space-y-3 w-fit", children: [question && _jsx("p", { className: "text-sm font-medium text-foreground", children: question }), _jsx("div", { className: cn(layout === "buttons" && "flex flex-wrap gap-2", layout === "cards" && "grid grid-cols-1 sm:grid-cols-2 gap-2", layout === "list" && "flex flex-col gap-1"), role: "group", "aria-label": question ?? "Escolha uma opção", children: choices.map((choice) => {
                    const isSelected = selected === choice.id;
                    if (layout === "buttons") {
                        return (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleSelect(choice.id), "aria-pressed": isSelected, className: cn(isSelected && "ring-2 ring-ring"), children: [choice.icon && (_jsx("span", { "aria-hidden": "true", children: choice.icon })), choice.label] }, choice.id));
                    }
                    if (layout === "cards") {
                        return (_jsxs(Card, { className: cn("p-3 cursor-pointer hover:bg-muted/50 transition-colors", isSelected && "ring-2 ring-ring"), onClick: () => handleSelect(choice.id), role: "button", "aria-pressed": isSelected, children: [choice.icon && (_jsx("span", { className: "text-base", "aria-hidden": "true", children: choice.icon })), _jsx("span", { className: "block font-medium text-sm text-foreground", children: choice.label }), choice.description && (_jsx("span", { className: "block text-xs text-muted-foreground mt-1", children: choice.description }))] }, choice.id));
                    }
                    // list
                    return (_jsxs("button", { className: cn("flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-left hover:bg-muted transition-colors", isSelected && "bg-muted ring-1 ring-ring"), onClick: () => handleSelect(choice.id), "aria-pressed": isSelected, children: [_jsx("span", { className: cn("w-4 h-4 rounded-full border-2 border-input flex-shrink-0", isSelected && "border-primary bg-primary"), "aria-hidden": "true" }), _jsxs("span", { className: "flex items-center gap-2 flex-1 min-w-0", children: [choice.icon && (_jsx("span", { "aria-hidden": "true", children: choice.icon })), _jsx("span", { className: "font-medium text-foreground", children: choice.label }), choice.description && (_jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: choice.description }))] })] }, choice.id));
                }) })] }));
}
