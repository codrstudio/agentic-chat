import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StreamingIndicator() {
    return (_jsxs("span", { className: "inline-flex items-end gap-1.5 py-1 mt-4", "aria-label": "Gerando resposta...", role: "status", children: [_jsx("span", { className: "size-1 rounded-full bg-primary animate-[streaming-bounce_1.2s_ease-in-out_infinite_0ms]" }), _jsx("span", { className: "size-1 rounded-full bg-primary animate-[streaming-bounce_1.2s_ease-in-out_infinite_150ms]" }), _jsx("span", { className: "size-1 rounded-full bg-primary animate-[streaming-bounce_1.2s_ease-in-out_infinite_300ms]" }), _jsx("style", { children: `
        @keyframes streaming-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      ` })] }));
}
