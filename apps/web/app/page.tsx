"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useAuth } from "@/context/auth-context";
import SiteFooter from "@/components/site-footer";
import ThemeToggle from "@/components/theme-toggle";

const cards = [
    {
        title: "Secure Semantic Search",
        body: "JWT session auth, blocked-account checks, and backend role enforcement for every sensitive endpoint.",
    },
    {
        title: "Admin-Ready Control Plane",
        body: "Dedicated admin area for uploads, user management, analytics, chunk previews, and indexed knowledge control.",
    },
    {
        title: "Production-Style Architecture",
        body: "FastAPI service layer separation, SQLite persistence, activity logs, and a clean protected frontend flow.",
    },
];

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
                    <Link href="/admin/login" className="rounded-full border border-cyan-300/50 px-4 py-2 text-cyan-700 hover:bg-cyan-100 dark:border-cyan-300/40 dark:text-cyan-200 dark:hover:bg-cyan-400/10">
                        Admin Login
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

            <section className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 pb-24 pt-10 md:grid-cols-[1.2fr_1fr] md:pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-7"
                >
                    <p className="inline-flex rounded-full border border-cyan-300/60 bg-cyan-100/70 px-4 py-1 text-xs uppercase tracking-[0.18em] text-cyan-900 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200">
                        Secure Semantic Intelligence
                    </p>
                    <h1 className="font-display text-5xl leading-tight text-slate-900 dark:text-slate-100 md:text-6xl">
                        Modern search platform with
                        <span className="block text-cyan-700 dark:text-cyan-300">admin-grade controls.</span>
                    </h1>
                    <p className="max-w-xl text-lg text-slate-700 dark:text-slate-300">
                        Turn your search engine into a production-style app with authenticated access, governance, upload indexing,
                        and clear operational visibility.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link href={isAuthenticated ? "/search" : "/login"} className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-200">
                            {isAuthenticated ? "Go To Search" : "Login To Start"}
                        </Link>
                        <Link href="/admin/login" className="rounded-full border border-slate-300/80 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-slate-200 dark:hover:bg-white/10">
                            Admin Portal
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-3xl border border-slate-300/80 bg-white/70 p-6 shadow-lg backdrop-blur-2xl dark:border-white/20 dark:bg-white/10"
                >
                    <h2 className="font-display text-2xl text-slate-900 dark:text-slate-100">How it works</h2>
                    <ol className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                        <li>1. Authenticated users query the semantic engine.</li>
                        <li>2. Query embeddings map against FAISS nearest chunks.</li>
                        <li>3. Top-result answer is returned and logged to history.</li>
                        <li>4. Admin uploads new docs, previews chunks, and reindexes.</li>
                        <li>5. Dashboard analytics expose operational health.</li>
                    </ol>
                </motion.div>
            </section>

            <section className="relative mx-auto grid w-full max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
                {cards.map((card, index) => (
                    <motion.article
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 * index, duration: 0.45 }}
                        className="rounded-3xl border border-slate-300/80 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/60 dark:border-white/15 dark:bg-white/10 dark:hover:border-cyan-300/40"
                    >
                        <h3 className="font-display text-2xl text-slate-900 dark:text-white">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{card.body}</p>
                    </motion.article>
                ))}
            </section>

            <SiteFooter />
        </main>
    );
}
