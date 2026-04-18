"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const STORAGE_KEY = "condesense-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const storedTheme = window.localStorage.getItem(STORAGE_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
            setTheme(storedTheme);
            applyTheme(storedTheme);
            return;
        }

        applyTheme("dark");
        window.localStorage.setItem(STORAGE_KEY, "dark");
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((currentTheme) => {
            const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
            window.localStorage.setItem(STORAGE_KEY, nextTheme);
            return nextTheme;
        });
    }, []);

    const value = useMemo(
        () => ({
            theme,
            toggleTheme,
        }),
        [theme, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
}