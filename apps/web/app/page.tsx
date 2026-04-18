"use client";

import Link from "next/link";

import { useAuth } from "@/context/auth-context";
import SiteFooter from "@/components/site-footer";
import ThemeToggle from "@/components/theme-toggle";
import SemanticLandingBody from "@/components/landing/semantic-landing-body";

export default function LandingPage() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <main className="relative min-h-screen overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="pointer-events-none absolute left-[-180px] top-[-140px] h-[460px] w-[460px] rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-170px] right-[-130px] h-[420px] w-[420px] rounded-full bg-emerald-300/15 blur-3xl" />

            <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                <p className="font-display text-2xl tracking-tight text-slate-900 dark:text-white">CondeSense</p>
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
                    <Link href="/login" className="rounded-full border border-slate-300/70 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10">
                        User Login
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link href="/search" className="rounded-full bg-white/90 px-4 py-2 font-semibold text-slate-950 hover:bg-white">
                                Enter Search
                            </Link>
                            <button
                                type="button"
                                onClick={() => void logout()}
                                className="rounded-full border border-red-300/50 px-4 py-2 text-red-700 hover:bg-red-100 dark:border-red-300/30 dark:text-red-200 dark:hover:bg-red-400/10"
                            >
                                Logout {user?.email}
                            </button>
                        </>
                    ) : null}
                </nav>
            </header>

            <SemanticLandingBody isAuthenticated={isAuthenticated} />

            <SiteFooter />
        </main>
    );
}
