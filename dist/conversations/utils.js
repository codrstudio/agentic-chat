export function formatRelativeTime(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60)
        return "now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}
export function buildInitialMessages(messages) {
    if (!messages)
        return undefined;
    // Index tool results by toolCallId
    const toolResults = new Map();
    for (const m of messages) {
        if (m.role === "tool" && Array.isArray(m.content)) {
            for (const part of m.content) {
                if (part.type === "tool-result" && part.toolCallId) {
                    const raw = part.output;
                    const value = typeof raw === "object" &&
                        raw !== null &&
                        "type" in raw &&
                        raw.type === "json"
                        ? raw.value
                        : raw;
                    toolResults.set(part.toolCallId, { toolName: part.toolName ?? "", result: value });
                }
            }
        }
    }
    const result = [];
    let i = 0;
    while (i < messages.length) {
        const m = messages[i];
        if (m.role === "user") {
            let content = "";
            const parts = [];
            if (typeof m.content === "string") {
                content = m.content;
            }
            else if (Array.isArray(m.content)) {
                for (const p of m.content) {
                    if (p["type"] === "text") {
                        const text = String(p["text"] ?? "");
                        if (!text.startsWith("[📎") && !content)
                            content = text;
                        parts.push(p);
                    }
                    else if (p["type"] === "image" || p["type"] === "file") {
                        parts.push({ type: p["type"], _ref: p["_ref"], mimeType: p["mimeType"] });
                    }
                    else {
                        parts.push(p);
                    }
                }
            }
            result.push({
                id: m._meta?.id ?? m.id ?? `msg-${i}`,
                role: "user",
                content,
                ...(parts.length > 0 ? { parts } : {}),
            });
            i++;
            continue;
        }
        if (m.role === "tool") {
            i++;
            continue;
        }
        if (m.role === "assistant") {
            const parts = [];
            let textContent = "";
            const id = m._meta?.id ?? m.id ?? `msg-${i}`;
            while (i < messages.length &&
                (messages[i].role === "assistant" || messages[i].role === "tool")) {
                const cur = messages[i];
                if (cur.role === "tool") {
                    i++;
                    continue;
                }
                if (typeof cur.content === "string") {
                    if (cur.content) {
                        parts.push({ type: "text", text: cur.content });
                        textContent += cur.content;
                    }
                }
                else if (Array.isArray(cur.content)) {
                    for (const p of cur.content) {
                        if (p.type === "text" && p.text) {
                            parts.push({ type: "text", text: p.text });
                            textContent += p.text;
                        }
                        else if (p.type === "tool-call" && p.toolCallId) {
                            const tr = toolResults.get(p.toolCallId);
                            parts.push({
                                type: "tool-invocation",
                                toolInvocation: {
                                    toolName: p.toolName ?? "",
                                    toolCallId: p.toolCallId,
                                    state: tr ? "result" : "call",
                                    args: p.input,
                                    result: tr?.result,
                                },
                            });
                        }
                    }
                }
                i++;
            }
            result.push({ id, role: "assistant", content: textContent, parts });
            continue;
        }
        i++;
    }
    return result;
}
export function groupConversations(conversations) {
    const favorites = [];
    const history = [];
    for (const conv of conversations) {
        if (conv.starred) {
            favorites.push(conv);
        }
        else {
            history.push(conv);
        }
    }
    return { favorites, history };
}
