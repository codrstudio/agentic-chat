import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
export function LazyRender({ children, minHeight = 120, rootMargin = "200px" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { rootMargin });
        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);
    if (visible)
        return _jsx(_Fragment, { children: children });
    return (_jsx("div", { ref: ref, className: "flex items-center justify-center text-muted-foreground text-xs rounded-md bg-muted/20 animate-pulse", style: { minHeight }, children: "Carregando..." }));
}
