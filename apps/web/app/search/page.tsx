"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import ProtectedGate from "@/components/auth/protected-gate";
import HeroSearch from "@/components/hero-search";
import RecentSearches from "@/components/recent-searches";
import ResultCard, { type SearchResult } from "@/components/result-card";
import { EmptyState, LoadingState } from "@/components/search-states";
import SiteFooter from "@/components/site-footer";
import ThemeToggle from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { fetchSemanticSearch } from "@/lib/search-api";

const SUGGESTIONS = [
    "Why does useEffect run twice in development?",
    "How do I avoid N+1 queries in SQLAlchemy?",
    "How can I debounce search input in React?",
    "FastAPI dependency injection best practices",
    "How to optimize pandas groupby performance?",
    "Difference between async and defer in JavaScript",
];

const RECENT_SEARCHES_KEY = "codesense-recent-searches";

export default function SearchPage() {
    const { user, logout } = useAuth();

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>(SUGGESTIONS);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestionMessage, setSuggestionMessage] = useState<string | null>(null);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const recentStored = window.localStorage.getItem(RECENT_SEARCHES_KEY);
        if (recentStored) {
            try {
                const parsed = JSON.parse(recentStored) as string[];
                if (Array.isArray(parsed)) {
                    setRecentSearches(parsed.filter((item) => typeof item === "string").slice(0, 8));
                }
            } catch {
                setRecentSearches([]);
            }
        }
    }, []);

    function rememberSearch(nextQuery: string) {
        const trimmed = nextQuery.trim();
        if (trimmed.length < 3) {
            return;
        }

        setRecentSearches((current) => {
            const updated = [trimmed, ...current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8);
            window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
            return updated;
        });
    }

    function clearRecentSearches() {
        setRecentSearches([]);
        window.localStorage.removeItem(RECENT_SEARCHES_KEY);
    }

    useEffect(() => {
        function onSlashFocus(event: KeyboardEvent) {
            const target = event.target as HTMLElement | null;
            const isEditable =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                target?.isContentEditable;

            if (event.key === "/" && !isEditable) {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        }

        window.addEventListener("keydown", onSlashFocus);
        return () => window.removeEventListener("keydown", onSlashFocus);
    }, []);

    const onSearch = useCallback(async (queryText: string) => {
        const trimmed = queryText.trim();
        if (trimmed.length < 3) {
            setError("Please enter at least 3 characters to search.");
            return;
        }

        setLoading(true);
        setError(null);
        setHasSearched(true);
        rememberSearch(trimmed);

        try {
            const payload = await fetchSemanticSearch(trimmed, { topK: 1 });
            setResults((payload.results ?? []).slice(0, 1));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "We could not complete your search right now. Please try again.",
            );
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed.length < 3) {
            setSuggestions(SUGGESTIONS);
            setIsSuggesting(false);
            setSuggestionMessage(null);
            return;
        }

        const controller = new AbortController();
        const timer = window.setTimeout(async () => {
            setIsSuggesting(true);
            setSuggestionMessage(null);

            try {
                const payload = await fetchSemanticSearch(trimmed, {
                    topK: 5,
                    signal: controller.signal,
                });

                const liveTitles = payload.results
                    .map((result) => result.title.trim())
                    .filter((title) => title.length > 0);

                const merged = Array.from(new Set([...liveTitles, ...SUGGESTIONS])).slice(0, 8);
                setSuggestions(merged.length > 0 ? merged : SUGGESTIONS);
            } catch {
                if (controller.signal.aborted) {
                    return;
                }
                setSuggestionMessage("Live suggestions are unavailable. You can still run a full search.");
                setSuggestions(SUGGESTIONS);
            } finally {
                if (!controller.signal.aborted) {
                    setIsSuggesting(false);
                }
            }
        }, 350);

        return () => {
            controller.abort();
            window.clearTimeout(timer);
        };
    }, [query]);

    function handleSubmit() {
        void onSearch(query);
    }

    function handleSuggestionSelect(suggestion: string) {
        setQuery(suggestion);
        setActiveSuggestion(-1);
        void onSearch(suggestion);
    }

    function handleRecentSearchSelect(value: string) {
        setQuery(value);
        setActiveSuggestion(-1);
        void onSearch(value);
    }

    return (
        <ProtectedGate>
            <main className="relative min-h-screen">
                <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 md:py-10">
                    <div className="pointer-events-none absolute left-6 top-12 hidden h-28 w-28 rounded-full bg-cyan-300/35 blur-2xl md:block" />
                    <div className="pointer-events-none absolute bottom-10 right-10 hidden h-24 w-24 rounded-full bg-orange-300/25 blur-2xl md:block" />

                    <header className="flex items-center justify-between">
                        <p className="font-display text-xl text-slate-900 dark:text-slate-100">CondeSense Search</p>
                        <div className="flex items-center gap-2 text-sm">
                            <Link
                                href="/"
                                aria-label="Go to homepage"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/70 bg-white/70 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                                    <path d="M12 3.4 3 10.6l1.25 1.56L6 10.75V20h5v-5h2v5h5v-9.25l1.75 1.4L21 10.6 12 3.4Z" />
                                </svg>
                            </Link>
                            <ThemeToggle />
                            <Link href="/history" className="rounded-full border border-slate-300/70 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10">
                                History
                            </Link>
                            {user?.role === "admin" ? (
                                <Link href="/admin/dashboard" className="rounded-full border border-cyan-300/50 px-4 py-2 text-cyan-700 hover:bg-cyan-100 dark:border-cyan-300/30 dark:text-cyan-200 dark:hover:bg-cyan-400/10">
                                    Admin
                                </Link>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => void logout()}
                                className="rounded-full border border-red-300/50 px-4 py-2 text-red-700 hover:bg-red-100 dark:border-red-300/30 dark:text-red-200 dark:hover:bg-red-500/10"
                            >
                                Logout
                            </button>
                        </div>
                    </header>

                    <HeroSearch
                        query={query}
                        loading={loading}
                        error={error}
                        suggestions={suggestions}
                        activeSuggestion={activeSuggestion}
                        isSuggesting={isSuggesting}
                        suggestionMessage={suggestionMessage}
                        inputRef={searchInputRef}
                        onQueryChange={setQuery}
                        onSubmit={handleSubmit}
                        onSuggestionSelect={handleSuggestionSelect}
                        onActiveSuggestionChange={setActiveSuggestion}
                    />

                    <section className="space-y-4 pb-10">
                        <RecentSearches items={recentSearches} onSelect={handleRecentSearchSelect} onClear={clearRecentSearches} />

                        {loading ? <LoadingState /> : null}

                        {!loading && results.length > 0
                            ? results.map((item, index) => (
                                <ResultCard key={`${item.record_id}-${index}`} item={item} index={index} query={query} />
                            ))
                            : null}

                        {!loading && results.length === 0 ? (
                            <EmptyState
                                hasSearched={hasSearched}
                                quickSuggestions={suggestions.slice(0, 4)}
                                onSuggestionSelect={handleSuggestionSelect}
                            />
                        ) : null}
                    </section>
                </section>

                <SiteFooter />
            </main>
        </ProtectedGate>
    );
}
