import { useState, useCallback, useEffect } from "react";
export function useConversations(options = {}) {
    const { endpoint = "", token, fetcher, autoFetch = true } = options;
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const doFetch = useCallback((url, init) => {
        const fn = fetcher ?? fetch;
        const headers = {
            "Content-Type": "application/json",
            ...init?.headers,
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return fn(url, { ...init, headers });
    }, [fetcher, token]);
    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await doFetch(`${endpoint}/api/v1/ai/conversations`);
            if (!res.ok)
                throw new Error(`Failed to fetch conversations: ${res.status}`);
            const data = (await res.json());
            setConversations(data);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        }
        finally {
            setIsLoading(false);
        }
    }, [doFetch, endpoint]);
    useEffect(() => {
        if (autoFetch) {
            void refresh();
        }
    }, [autoFetch, refresh]);
    const create = useCallback(async (agentId) => {
        const res = await doFetch(`${endpoint}/api/v1/ai/conversations`, {
            method: "POST",
            body: JSON.stringify({ agentId }),
        });
        if (!res.ok)
            throw new Error(`Failed to create conversation: ${res.status}`);
        const created = (await res.json());
        setConversations((prev) => [created, ...prev]);
        return created;
    }, [doFetch, endpoint]);
    const rename = useCallback(async (id, title) => {
        const res = await doFetch(`${endpoint}/api/v1/ai/conversations/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ title }),
        });
        if (!res.ok)
            throw new Error(`Failed to rename conversation: ${res.status}`);
        setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)));
    }, [doFetch, endpoint]);
    const star = useCallback(async (id, starred) => {
        // Optimistic update
        setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, starred } : c)));
        try {
            const res = await doFetch(`${endpoint}/api/v1/ai/conversations/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ starred }),
            });
            if (!res.ok)
                throw new Error(`Failed to star conversation: ${res.status}`);
        }
        catch (err) {
            // Rollback on error
            setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, starred: !starred } : c)));
            throw err;
        }
    }, [doFetch, endpoint]);
    const remove = useCallback(async (id) => {
        const res = await doFetch(`${endpoint}/api/v1/ai/conversations/${id}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error(`Failed to delete conversation: ${res.status}`);
        setConversations((prev) => prev.filter((c) => c.id !== id));
    }, [doFetch, endpoint]);
    const exportUrl = useCallback((id, format = "json") => {
        const params = new URLSearchParams({ format });
        if (token)
            params.set("token", token);
        return `${endpoint}/api/v1/ai/conversations/${id}/export?${params.toString()}`;
    }, [endpoint, token]);
    return {
        conversations,
        isLoading,
        error,
        refresh,
        create,
        rename,
        star,
        remove,
        exportUrl,
    };
}
