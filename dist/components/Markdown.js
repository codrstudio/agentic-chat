import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "../lib/utils.js";
const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeHighlight];
const components = {
    h1({ children }) {
        return _jsx("h1", { className: "text-xl font-semibold", style: { marginTop: "20px", marginBottom: "8px" }, children: children });
    },
    h2({ children }) {
        return _jsx("h2", { className: "text-lg font-semibold", style: { marginTop: "20px", marginBottom: "8px" }, children: children });
    },
    h3({ children }) {
        return _jsx("h3", { className: "text-base font-semibold", style: { marginTop: "20px", marginBottom: "8px" }, children: children });
    },
    h4({ children }) {
        return _jsx("h4", { className: "font-semibold", style: { marginTop: "20px", marginBottom: "8px" }, children: children });
    },
    p({ children }) {
        return _jsx("p", { className: "mb-4 last:mb-0", children: children });
    },
    ul({ children }) {
        return _jsx("ul", { style: { paddingLeft: "24px", marginTop: "8px", marginBottom: "8px", listStyleType: "disc" }, children: children });
    },
    ol({ children }) {
        return _jsx("ol", { style: { paddingLeft: "24px", marginTop: "8px", marginBottom: "8px", listStyleType: "decimal" }, children: children });
    },
    li({ children }) {
        return _jsx("li", { style: { marginTop: "4px", marginBottom: "4px" }, children: children });
    },
    hr() {
        return _jsx("hr", { className: "border-border", style: { marginTop: "16px", marginBottom: "16px" } });
    },
    pre({ children }) {
        return (_jsx("pre", { className: "bg-muted border border-border rounded-md overflow-hidden", style: { marginTop: "12px", marginBottom: "12px" }, children: children }));
    },
    code({ className, children }) {
        const isBlock = className?.startsWith("language-");
        if (isBlock) {
            return (_jsx("code", { className: cn("block p-4 overflow-x-auto font-mono text-sm", className), children: children }));
        }
        return (_jsx("code", { className: "bg-muted border border-border rounded-sm px-1.5 py-0.5 font-mono text-sm", children: children }));
    },
    a({ href, children }) {
        return (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "text-primary underline underline-offset-2 hover:opacity-80", children: children }));
    },
    blockquote({ children }) {
        return (_jsx("blockquote", { className: "border-l-[3px] border-border py-1 px-3 text-muted-foreground", style: { marginTop: "12px", marginBottom: "12px" }, children: children }));
    },
    table({ children }) {
        return (_jsx("div", { className: "overflow-x-auto", children: _jsx("table", { className: "w-full border-collapse text-sm", children: children }) }));
    },
    th({ children }) {
        return (_jsx("th", { className: "border border-border px-3 py-1.5 text-left font-semibold bg-muted", children: children }));
    },
    td({ children }) {
        return (_jsx("td", { className: "border border-border px-3 py-1.5 text-left", children: children }));
    },
};
export const Markdown = memo(function Markdown({ children }) {
    return (_jsx("div", { className: "text-foreground text-sm", style: { lineHeight: "1.625em" }, children: _jsx(ReactMarkdown, { remarkPlugins: REMARK_PLUGINS, rehypePlugins: REHYPE_PLUGINS, components: components, children: children }) }));
});
