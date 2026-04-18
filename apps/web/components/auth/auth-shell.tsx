"use client";

import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import ThemeToggle from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";

type AuthShellProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    showFooter?: boolean;
};

export default function AuthShell({ title, subtitle, children, showFooter = false }: AuthShellProps) {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <main className="relative min-h-screen overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-64 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />

            <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                <Link href="/" className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">
                    CondeSense
                </Link>
                <nav className="flex items-center gap-3 text-sm">
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
                    {isAuthenticated ? (
                        <>
                            <Link href="/search" className="rounded-full border border-cyan-300/60 px-4 py-2 text-cyan-700 hover:bg-cyan-100 dark:text-cyan-200 dark:hover:bg-cyan-400/10">
                                Search
                            </Link>
                            <button
                                type="button"
                                onClick={() => void logout()}
                                className="rounded-full border border-red-300/50 px-4 py-2 text-red-700 hover:bg-red-100 dark:text-red-200 dark:hover:bg-red-400/10"
                            >
                                Logout {user?.email}
                            </button>
                        </>
                    ) : null}
                </nav>
            </header>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-8">
                <div className="mb-8">
                    <h1 className="font-display text-4xl text-slate-900 dark:text-white md:text-5xl">{title}</h1>
                    <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">{subtitle}</p>
                </div>
                {children}
            </section>

            {showFooter ? <SiteFooter /> : null}
        </main>
    );
}
