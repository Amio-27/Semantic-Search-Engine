"use client";

import { useTheme } from "@/context/theme-context";

type ThemeToggleProps = {
    className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/20 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:bg-slate-800/60 ${className}`}
        >
            {isDark ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm0-18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm8 9a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1ZM5 12a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1Zm11.95 6.54a1 1 0 0 1 1.41 1.42l-.7.7a1 1 0 0 1-1.42-1.41l.71-.71Zm-10.6-10.6a1 1 0 0 1 1.42 0 1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.41l.7-.71Zm11.31-1.42a1 1 0 0 1 0 1.42l-.71.7a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0ZM6.34 17.66a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.41l.71-.71a1 1 0 0 1 1.41 0Z" />
                </svg>
            ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M20.74 14.05A9 9 0 0 1 9.95 3.26a1 1 0 0 0-1.3-1.18 10.5 10.5 0 1 0 13.27 13.27 1 1 0 0 0-1.18-1.3Z" />
                </svg>
            )}
            <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
        </button>
    );
}
