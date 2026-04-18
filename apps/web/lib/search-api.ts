import { type SearchResult } from "@/components/result-card";
import { API_BASE } from "@/lib/api-client";

export type SearchResponse = {
    query: string;
    results: SearchResult[];
};

function normalizeErrorMessage(status: number, detail?: string): string {
    if (status === 422) {
        return "Please enter a clearer question (at least 3 characters).";
    }

    if (status === 400) {
        return detail?.trim() || "Search request could not be processed. Please try another query.";
    }

    if (status === 401 || status === 403) {
        return "Your session has expired or your account is blocked. Please login again.";
    }

    if (status === 503) {
        return "Search service is warming up. Please try again in a few seconds.";
    }

    if (status === 502 || status === 500) {
        return "The search service had a temporary issue. Please retry shortly.";
    }

    return detail?.trim() || `Search request failed (HTTP ${status}).`;
}

export async function fetchSemanticSearch(
    query: string,
    options?: { topK?: number; signal?: AbortSignal },
): Promise<SearchResponse> {
    let response: Response;
    try {
        response = await fetch(`${API_BASE}/search`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, top_k: options?.topK ?? 8 }),
            signal: options?.signal,
        });
    } catch (error) {
        if (options?.signal?.aborted) {
            throw error;
        }
        throw new Error(
            `Could not reach backend API at ${API_BASE}. Check API_BASE_URL or NEXT_PUBLIC_API_BASE_URL.`,
        );
    }

    if (!response.ok) {
        let detail = "";
        try {
            const payload = await response.json();
            detail =
                typeof payload?.detail === "string"
                    ? payload.detail
                    : payload?.error || "";
        } catch {
            detail = "";
        }
        throw new Error(normalizeErrorMessage(response.status, detail));
    }

    const payload = (await response.json()) as SearchResponse;
    return {
        query: payload.query,
        results: Array.isArray(payload.results) ? payload.results : [],
    };
}
