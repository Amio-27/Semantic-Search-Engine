import Link from "next/link";

type FooterLink = {
    label: string;
    href: string;
    external?: boolean;
};

type FooterSection = {
    title: string;
    links: FooterLink[];
};

const footerSections: FooterSection[] = [
    {
        title: "Product",
        links: [
            { label: "Semantic Search", href: "/search" },
            { label: "Admin Console", href: "/admin/login" },
            { label: "Search History", href: "/history" },
            { label: "User Login", href: "/login" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About CondeSense", href: "https://www.crunchbase.com", external: true },
            { label: "Careers", href: "https://www.linkedin.com/jobs", external: true },
            { label: "Contact", href: "mailto:hello@condesense.ai", external: true },
            { label: "Community", href: "https://discord.com", external: true },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "FastAPI Docs", href: "https://fastapi.tiangolo.com", external: true },
            { label: "Next.js Docs", href: "https://nextjs.org/docs", external: true },
            { label: "FAISS Guide", href: "https://github.com/facebookresearch/faiss/wiki", external: true },
            { label: "OpenAI API", href: "https://platform.openai.com/docs", external: true },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "https://automattic.com/privacy/", external: true },
            { label: "Terms of Service", href: "https://policies.google.com/terms", external: true },
            { label: "Cookie Policy", href: "https://www.cloudflare.com/cookie-policy/", external: true },
            { label: "Security", href: "https://owasp.org/www-project-top-ten/", external: true },
        ],
    },
];

const socialLinks = [
    {
        label: "Facebook",
        href: "https://facebook.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M13.5 9H16V6h-2.5C10.47 6 9 7.79 9 10.5V13H7v3h2v6h3v-6h2.42l.58-3H12v-2.5c0-.9.3-1.5 1.5-1.5Z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Zm2.5 13.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5v-9A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9ZM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm4.25-6.25a1 1 0 1 0 1-1 1 1 0 0 0-1 1Z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.5 9.87h2.87V19H5.5Zm4.5 0h2.75v1.24h.04a3 3 0 0 1 2.72-1.49C18.42 9.62 19 11.4 19 13.7V19h-2.87v-4.7c0-1.12-.02-2.56-1.56-2.56s-1.8 1.22-1.8 2.48V19H10Z" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "https://youtube.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M21.56 7.2a2.5 2.5 0 0 0-1.76-1.77C18.24 5 12 5 12 5s-6.24 0-7.8.43A2.5 2.5 0 0 0 2.44 7.2 25.5 25.5 0 0 0 2 12a25.5 25.5 0 0 0 .44 4.8 2.5 2.5 0 0 0 1.76 1.77C5.76 19 12 19 12 19s6.24 0 7.8-.43a2.5 2.5 0 0 0 1.76-1.77A25.5 25.5 0 0 0 22 12a25.5 25.5 0 0 0-.44-4.8ZM10 15.5v-7L16 12Z" />
            </svg>
        ),
    },
    {
        label: "X",
        href: "https://x.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M18.9 2H22l-6.77 7.75L23 22h-6.08l-4.76-6.23L6.7 22H3.57l7.25-8.29L1 2h6.23l4.3 5.68ZM17.8 20h1.7L6.3 3.9H4.47Z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.09.66-.22.66-.48v-1.66c-2.73.6-3.3-1.16-3.3-1.16A2.61 2.61 0 0 0 5.1 16.8c-.9-.62.07-.6.07-.6a2.06 2.06 0 0 1 1.5 1 2.1 2.1 0 0 0 2.86.82 2.1 2.1 0 0 1 .63-1.3c-2.17-.24-4.45-1.08-4.45-4.8a3.74 3.74 0 0 1 1-2.6 3.46 3.46 0 0 1 .1-2.56s.84-.27 2.75 1a9.5 9.5 0 0 1 5 0c1.9-1.27 2.74-1 2.74-1a3.46 3.46 0 0 1 .1 2.56 3.74 3.74 0 0 1 1 2.6c0 3.73-2.28 4.55-4.46 4.8a2.35 2.35 0 0 1 .67 1.83V21c0 .26.18.57.67.48A10 10 0 0 0 12 2Z" />
            </svg>
        ),
    },
];

function FooterAnchor({ link }: { link: FooterLink }) {
    const baseClasses =
        "group inline-flex items-center text-sm text-slate-600 transition-colors duration-200 hover:text-slate-950 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-slate-300 dark:hover:text-white";

    if (link.external) {
        return (
            <a href={link.href} target="_blank" rel="noreferrer" className={baseClasses}>
                <span className="border-b border-transparent transition-colors duration-200 group-hover:border-slate-400">{link.label}</span>
            </a>
        );
    }

    return (
        <Link href={link.href} className={baseClasses}>
            <span className="border-b border-transparent transition-colors duration-200 group-hover:border-slate-400">{link.label}</span>
        </Link>
    );
}

export default function SiteFooter() {
    return (
        <footer className="relative mt-16 border-t border-slate-200/70 bg-slate-100/95 pb-6 pt-16 text-slate-900 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-950/90" />

            <div className="relative mx-auto w-full max-w-6xl px-6">
                <section
                    aria-labelledby="footer-cta-title"
                    className="relative overflow-hidden rounded-[2rem] border border-indigo-200/50 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 px-8 py-10 text-white shadow-[0_24px_80px_-30px_rgba(79,70,229,0.85)]"
                >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-14 left-1/3 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />

                    <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl space-y-3">
                            <h2 id="footer-cta-title" className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                                Build Better Search with AI
                            </h2>
                            <p className="max-w-2xl text-sm text-blue-50 md:text-base">
                                Smarter semantic search for faster and more relevant results.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/search"
                                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500"
                            >
                                Get Started
                            </Link>
                            <a
                                href="https://nextjs.org/docs"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>

                <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_2fr]">
                    <section aria-label="Brand and newsletter" className="space-y-6">
                        <div>
                            <p className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">CondeSense</p>
                            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
                                AI-powered semantic search infrastructure for teams that need speed, context, and precision at scale.
                            </p>
                        </div>

                        <form
                            className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5"
                            action="https://github.com"
                            method="get"
                            aria-label="Subscribe to CondeSense newsletter"
                        >
                            <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">
                                Subscribe to our newsletter
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    id="newsletter-email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Enter your work email"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-white/20 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">No spam. Product updates and semantic search insights only.</p>
                        </form>
                    </section>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {footerSections.map((section) => (
                            <nav key={section.title} aria-label={section.title}>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{section.title}</h3>
                                <ul className="mt-4 space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <FooterAnchor link={link} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-5 border-t border-slate-300/70 pt-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-slate-600 dark:text-slate-300">© 2026 CondeSense. All rights reserved.</p>

                    <ul className="flex flex-wrap items-center gap-2" aria-label="CondeSense social links">
                        {socialLinks.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Visit our ${item.label} page`}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-white/20 dark:bg-white/10 dark:text-slate-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200"
                                >
                                    {item.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}