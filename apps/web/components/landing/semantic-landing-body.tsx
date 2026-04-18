"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type SemanticLandingBodyProps = {
    isAuthenticated?: boolean;
};

type FeatureCard = {
    title: string;
    description: string;
    eyebrow: string;
};

type StoryStep = {
    label: string;
    title: string;
    description: string;
    bullets: string[];
    panelTitle: string;
    panelBody: string;
};

type UseCase = {
    title: string;
    description: string;
    signal: string;
    metricLabel: string;
    metricBase: number;
    metricPeak: number;
    metricSuffix: string;
};

type DeepSection = {
    title: string;
    description: string;
    stats: string[];
    accent: string;
};

const featureCards: FeatureCard[] = [
    {
        eyebrow: "Security",
        title: "Secure Retrieval Access",
        description:
            "Role-aware authentication, audit-friendly search logs, and controlled workspace boundaries keep sensitive knowledge protected.",
    },
    {
        eyebrow: "Control",
        title: "Governed Search Operations",
        description:
            "Teams can evolve knowledge safely with upload review, indexing visibility, and policy-driven retrieval behavior.",
    },
    {
        eyebrow: "Scale",
        title: "Production Architecture",
        description:
            "Composable APIs, vector indexing, and resilient query flow deliver stable semantic performance under real product load.",
    },
];

const storySteps: StoryStep[] = [
    {
        label: "Step 01",
        title: "Upload documents",
        description: "Bring in engineering docs, SOPs, contracts, FAQs, and internal notes from trusted sources.",
        bullets: ["Type-safe upload pipeline", "Versioned files", "Policy-aware ingestion"],
        panelTitle: "Document Intake",
        panelBody: "Raw files are validated, normalized, and queued for semantic processing.",
    },
    {
        label: "Step 02",
        title: "Chunk and embed content",
        description: "Documents are segmented into context-preserving chunks and transformed into high-dimensional vectors.",
        bullets: ["Context windows", "Metadata enrichment", "High-quality embeddings"],
        panelTitle: "Embedding Engine",
        panelBody: "Each chunk becomes searchable by meaning, not only by keywords.",
    },
    {
        label: "Step 03",
        title: "Index data",
        description: "Vectors and metadata are indexed for low-latency retrieval over large knowledge collections.",
        bullets: ["ANN index", "Fast lookup maps", "Incremental updates"],
        panelTitle: "Vector Index",
        panelBody: "The retrieval layer is optimized for speed and stable relevance under load.",
    },
    {
        label: "Step 04",
        title: "Retrieve relevant context",
        description: "Query embeddings find semantically aligned chunks across multiple content domains.",
        bullets: ["Intent matching", "Cross-document recall", "Low-noise context"],
        panelTitle: "Semantic Retrieval",
        panelBody: "The system pulls context that matches intent, synonyms, and concept-level meaning.",
    },
    {
        label: "Step 05",
        title: "Rerank results",
        description: "A reranking layer scores candidate context and promotes the most useful evidence.",
        bullets: ["Query-aware rerank", "Evidence prioritization", "Quality controls"],
        panelTitle: "Relevance Reranking",
        panelBody: "Top candidates are reordered to maximize relevance before response synthesis.",
    },
    {
        label: "Step 06",
        title: "Generate grounded answers",
        description: "Final answers are generated from retrieved evidence, reducing hallucinations and improving trust.",
        bullets: ["Grounded generation", "Cited context", "Reliable user answers"],
        panelTitle: "Answer Generation",
        panelBody: "Users receive concise, grounded responses connected to trusted internal knowledge.",
    },
];

const useCases: UseCase[] = [
    {
        title: "Internal knowledge base",
        signal: "Engineering + Operations",
        description: "Search architecture docs, runbooks, and design notes with intent-level relevance.",
        metricLabel: "Coverage",
        metricBase: 68,
        metricPeak: 97,
        metricSuffix: "%",
    },
    {
        title: "Legal and research documents",
        signal: "Risk + Compliance",
        description: "Find policy clauses and precedent context without relying on exact phrasing.",
        metricLabel: "Precision",
        metricBase: 61,
        metricPeak: 95,
        metricSuffix: "%",
    },
    {
        title: "Support search",
        signal: "Customer Experience",
        description: "Help agents retrieve consistent answers from tickets, guides, and troubleshooting content.",
        metricLabel: "Resolved/day",
        metricBase: 420,
        metricPeak: 2400,
        metricSuffix: "",
    },
    {
        title: "Team wiki search",
        signal: "Cross-functional",
        description: "Navigate scattered documentation and instantly surface the most relevant team knowledge.",
        metricLabel: "Adoption teams",
        metricBase: 12,
        metricPeak: 84,
        metricSuffix: "",
    },
];

const deepSections: DeepSection[] = [
    {
        title: "Context windows that preserve meaning",
        description:
            "Chunking is optimized for semantic continuity, helping retrieval return complete, useful context instead of fragmented text.",
        stats: ["Context-preserving segmentation", "Lower semantic drift", "Higher answer precision"],
        accent: "from-blue-500/20 via-cyan-400/10 to-indigo-500/20",
    },
    {
        title: "Feedback loops for search quality",
        description:
            "Track query outcomes, refine relevance thresholds, and improve answer quality with measurable retrieval analytics.",
        stats: ["Quality dashboards", "Recall and precision tuning", "Continuous relevance iteration"],
        accent: "from-indigo-500/20 via-violet-400/10 to-blue-500/20",
    },
    {
        title: "Always-on indexing without disruption",
        description:
            "Incremental indexing keeps knowledge fresh while maintaining stable query latency for active users.",
        stats: ["Incremental ingestion", "Low-latency serving", "Reliable production rollouts"],
        accent: "from-cyan-500/20 via-blue-400/10 to-violet-500/20",
    },
];

const pipeline = ["Query", "Embedding", "Vector Search", "Ranking", "Answer"];

const governanceCards = [
    {
        title: "Admin analytics",
        body: "Understand query trends, coverage gaps, and retrieval quality over time.",
    },
    {
        title: "Security controls",
        body: "Apply role-based access, managed sessions, and protected search endpoints.",
    },
    {
        title: "Governance workflows",
        body: "Audit user activity, manage uploaded content lifecycle, and enforce policy.",
    },
];

const workflowMetricSeeds = {
    subscribers: 1302620,
    indexedChunks: 1130000,
    dailyQueries: 214400,
    latency: 92,
};

const workflowMetricPeaks = {
    subscribers: 2584100,
    indexedChunks: 1940000,
    dailyQueries: 416800,
    latency: 58,
};

const reveal = {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const },
    viewport: { once: true, amount: 0.24 },
} satisfies Pick<HTMLMotionProps<"div">, "initial" | "whileInView" | "transition" | "viewport">;

function clamp01(value: number): number {
    return Math.max(0, Math.min(1, value));
}

function phasedProgress(progress: number, index: number, total: number): number {
    const start = index / total;
    const end = (index + 1) / total;
    if (end <= start) {
        return 0;
    }
    return clamp01((progress - start) / (end - start));
}

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-indigo-300/40 bg-indigo-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200 dark:text-indigo-200">
                {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-slate-900 dark:text-white md:text-5xl">{title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">{description}</p>
        </div>
    );
}

export default function SemanticLandingBody({ isAuthenticated = false }: SemanticLandingBodyProps) {
    const heroRef = useRef<HTMLElement | null>(null);
    const workflowRef = useRef<HTMLElement | null>(null);
    const workflowResetTimerRef = useRef<number | null>(null);
    const useCasesRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(heroProgress, [0, 1], [0, 56]);

    const { scrollYProgress: workflowProgress } = useScroll({
        target: workflowRef,
        offset: ["start 88%", "end 22%"],
    });
    const smoothWorkflowProgress = useSpring(workflowProgress, {
        stiffness: 130,
        damping: 26,
        mass: 0.35,
    });

    const { scrollYProgress: useCasesScrollProgress } = useScroll({
        target: useCasesRef,
        offset: ["start 85%", "end 25%"],
    });
    const smoothUseCasesProgress = useSpring(useCasesScrollProgress, {
        stiffness: 120,
        damping: 24,
        mass: 0.34,
    });

    const [activeStep, setActiveStep] = useState(0);
    const [workflowMetrics, setWorkflowMetrics] = useState(workflowMetricSeeds);
    const [workflowPercent, setWorkflowPercent] = useState(0);
    const [activeUseCase, setActiveUseCase] = useState(0);
    const [useCasesProgress, setUseCasesProgress] = useState(0);

    const numberFormatter = useMemo(() => new Intl.NumberFormat("en-US"), []);
    const compactFormatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
            }),
        [],
    );

    useEffect(() => {
        return () => {
            if (workflowResetTimerRef.current) {
                window.clearTimeout(workflowResetTimerRef.current);
            }
        };
    }, []);

    useMotionValueEvent(smoothWorkflowProgress, "change", (latest) => {
        const progress = clamp01(latest);
        const easedProgress = Math.pow(progress, 0.9);

        setWorkflowPercent(Math.round(progress * 100));
        setActiveStep(Math.min(storySteps.length - 1, Math.floor(progress * storySteps.length)));
        setWorkflowMetrics({
            subscribers: Math.round(
                workflowMetricSeeds.subscribers +
                easedProgress * (workflowMetricPeaks.subscribers - workflowMetricSeeds.subscribers),
            ),
            indexedChunks: Math.round(
                workflowMetricSeeds.indexedChunks +
                easedProgress * (workflowMetricPeaks.indexedChunks - workflowMetricSeeds.indexedChunks),
            ),
            dailyQueries: Math.round(
                workflowMetricSeeds.dailyQueries +
                easedProgress * (workflowMetricPeaks.dailyQueries - workflowMetricSeeds.dailyQueries),
            ),
            latency: Math.round(
                workflowMetricSeeds.latency -
                easedProgress * (workflowMetricSeeds.latency - workflowMetricPeaks.latency),
            ),
        });

        if (workflowResetTimerRef.current) {
            window.clearTimeout(workflowResetTimerRef.current);
        }

        workflowResetTimerRef.current = window.setTimeout(() => {
            setActiveStep(0);
            setWorkflowPercent(0);
            setWorkflowMetrics(workflowMetricSeeds);
        }, 700);
    });

    useMotionValueEvent(smoothUseCasesProgress, "change", (latest) => {
        const progress = clamp01(latest);
        const activeIndex = Math.min(useCases.length - 1, Math.floor(progress * useCases.length));
        setUseCasesProgress(progress);
        setActiveUseCase(activeIndex);
    });

    return (
        <>
            <section ref={heroRef} className="relative overflow-hidden px-6 pb-24 pt-14 md:pb-32 md:pt-20">
                <motion.div
                    style={{ y: heroY }}
                    className="pointer-events-none absolute left-[-140px] top-[-100px] h-[360px] w-[360px] rounded-full bg-blue-500/20 blur-3xl"
                />
                <motion.div
                    style={{ y: heroY }}
                    className="pointer-events-none absolute right-[-120px] top-[60px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl"
                />

                <div className="relative mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center">
                    <motion.div {...reveal}>
                        <p className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-900 dark:text-cyan-200">
                            AI Semantic Search Platform
                        </p>
                        <h1 className="mt-5 font-display text-5xl leading-[1.05] text-slate-900 dark:text-white md:text-7xl">
                            Search by meaning.
                            <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                                Answer with grounded context.
                            </span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
                            Deliver fast, relevant, and secure knowledge retrieval across your documents, tickets, wikis, and operational playbooks.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href={isAuthenticated ? "/search" : "/login"}
                                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
                            >
                                {isAuthenticated ? "Go To Search" : "Start Searching"}
                            </Link>
                            <Link
                                href="/search"
                                className="rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                            >
                                Explore Live Demo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        {...reveal}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative rounded-3xl border border-white/30 bg-slate-900/85 p-6 shadow-[0_30px_90px_-32px_rgba(59,130,246,0.65)] backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
                            <span>Semantic Query Console</span>
                            <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">Live</span>
                        </div>
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs text-slate-400">Query</p>
                            <p className="mt-2 text-sm text-slate-100">Find onboarding policy for contractor access and MFA exceptions</p>
                        </div>

                        <div className="mt-4 space-y-3">
                            {[
                                "Policy Handbook - Access Controls",
                                "Security FAQ - MFA Scope",
                                "IT SOP - Contractor Provisioning",
                            ].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.18 * index, duration: 0.45 }}
                                    className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-3"
                                >
                                    <p className="text-xs text-cyan-100">Top context {index + 1}</p>
                                    <p className="mt-1 text-sm text-slate-100">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="px-6 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-6xl">
                    <motion.div {...reveal}>
                        <SectionHeading
                            eyebrow="Core Capabilities"
                            title="Built for reliable semantic relevance"
                            description="Every query passes through secure retrieval logic, controlled indexing, and production-safe architecture."
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {featureCards.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: index * 0.12, duration: 0.45 }}
                                className="rounded-3xl border border-slate-300/70 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-white/15 dark:bg-white/10"
                            >
                                <p className="text-xs uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">{item.eyebrow}</p>
                                <h3 className="mt-3 font-display text-2xl text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.description}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section ref={workflowRef} className="px-6 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-300/70 bg-white/70 p-6 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-slate-900/55 md:p-8">
                    <motion.div {...reveal}>
                        <SectionHeading
                            eyebrow="Workflow Story"
                            title="Semantic pipeline at a glance"
                            description="A stable, readable workflow section with live-style stats and clear stage-by-stage progression."
                        />
                    </motion.div>

                    <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-300/70 dark:bg-white/10">
                        <motion.div
                            style={{ scaleX: smoothWorkflowProgress }}
                            className="h-full origin-left bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500"
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                        <span>Scroll-synced simulation</span>
                        <span>{workflowPercent}%</span>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 14 }} className="rounded-2xl border border-slate-300/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Subscribers</p>
                            <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">{numberFormatter.format(workflowMetrics.subscribers)}+</p>
                        </motion.div>
                        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 14 }} transition={{ delay: 0.05 }} className="rounded-2xl border border-cyan-300/25 bg-cyan-400/10 p-4">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-200">Indexed chunks</p>
                            <p className="mt-1 text-xl font-semibold text-cyan-100">{numberFormatter.format(workflowMetrics.indexedChunks)}</p>
                        </motion.div>
                        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 14 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-indigo-300/25 bg-indigo-400/10 p-4">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-indigo-200">Daily queries</p>
                            <p className="mt-1 text-xl font-semibold text-indigo-100">{compactFormatter.format(workflowMetrics.dailyQueries)}</p>
                        </motion.div>
                        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 14 }} transition={{ delay: 0.15 }} className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-4">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-200">Latency</p>
                            <p className="mt-1 text-xl font-semibold text-emerald-100">{workflowMetrics.latency}ms</p>
                        </motion.div>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {storySteps.map((step, index) => (
                            <motion.article
                                key={step.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: index * 0.06, duration: 0.35 }}
                                className={`rounded-2xl border p-4 transition ${activeStep === index
                                    ? "border-indigo-400/70 bg-indigo-500/15 shadow-[0_0_0_1px_rgba(99,102,241,0.35)]"
                                    : "border-slate-300/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
                                    }`}
                            >
                                <p className="text-[11px] uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">{step.label}</p>
                                <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {step.bullets.map((bullet) => (
                                        <span key={bullet} className="rounded-full border border-slate-300/70 bg-white/80 px-2.5 py-1 text-[11px] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                                            {bullet}
                                        </span>
                                    ))}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section ref={useCasesRef} className="px-6 pb-24 pt-24 md:pb-32">
                <div className="mx-auto w-full max-w-6xl">
                    <motion.div {...reveal}>
                        <SectionHeading
                            eyebrow="Use Cases"
                            title="Designed for real semantic search workloads"
                            description="Support technical teams, compliance workflows, and knowledge-heavy operations with one retrieval layer."
                        />
                    </motion.div>

                    <div className="mt-8 rounded-2xl border border-slate-300/70 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            <span>Use-case progression</span>
                            <span>{Math.round(useCasesProgress * 100)}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-300/70 dark:bg-white/10">
                            <motion.div
                                style={{ scaleX: smoothUseCasesProgress }}
                                className="h-full origin-left bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500"
                            />
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {useCases.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: index * 0.1, duration: 0.45 }}
                                animate={{
                                    y: activeUseCase === index ? -4 : 0,
                                    scale: activeUseCase === index ? 1.01 : 1,
                                }}
                                className={`rounded-3xl border p-6 shadow-xl backdrop-blur transition ${activeUseCase === index
                                        ? "border-cyan-300/55 bg-cyan-400/10 shadow-[0_18px_50px_-25px_rgba(34,211,238,0.6)]"
                                        : "border-slate-300/70 bg-white/65 dark:border-white/15 dark:bg-white/10"
                                    }`}
                            >
                                <p className="text-xs uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{item.signal}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.metricLabel}</p>
                                    <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                                        {Math.round(
                                            item.metricBase +
                                            phasedProgress(useCasesProgress, index, useCases.length) *
                                            (item.metricPeak - item.metricBase),
                                        )}
                                        {item.metricSuffix}
                                    </p>
                                </div>
                                <h3 className="mt-2 font-display text-3xl text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.description}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-6xl space-y-10">
                    {deepSections.map((item, index) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.22 }}
                            transition={{ duration: 0.55 }}
                            className="grid items-stretch gap-6 rounded-3xl border border-slate-300/70 bg-white/70 p-6 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-white/10 md:grid-cols-2"
                        >
                            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.accent} p-5`}>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
                                <div className="relative h-full rounded-xl border border-white/20 bg-slate-900/70 p-5">
                                    <p className="text-xs uppercase tracking-[0.16em] text-indigo-300">Search Quality Layer</p>
                                    <p className="mt-3 text-sm leading-7 text-slate-200">{item.description}</p>
                                </div>
                            </div>

                            <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-first" : ""}`}>
                                <h3 className="font-display text-3xl text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.description}</p>
                                <ul className="mt-5 space-y-2">
                                    {item.stats.map((entry) => (
                                        <li key={entry} className="rounded-xl border border-slate-300/80 bg-white/75 px-3 py-2 text-sm text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">
                                            {entry}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="px-6 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-300/70 bg-white/70 p-6 shadow-2xl backdrop-blur dark:border-white/15 dark:bg-white/10 md:p-10">
                    <motion.div {...reveal}>
                        <SectionHeading
                            eyebrow="Architecture Pipeline"
                            title="Semantic retrieval path"
                            description="Every request moves through a predictable, observable retrieval pipeline."
                        />
                    </motion.div>

                    <div className="mt-10 grid gap-4 md:grid-cols-5">
                        {pipeline.map((step, index) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.35 }}
                                className="relative rounded-2xl border border-indigo-300/40 bg-indigo-500/10 p-4 text-center"
                            >
                                <p className="text-xs uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">Stage {index + 1}</p>
                                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-6xl">
                    <motion.div {...reveal}>
                        <SectionHeading
                            eyebrow="Trust Layer"
                            title="Admin analytics, security, and governance"
                            description="Give your organization confidence with observability, access control, and auditable knowledge workflows."
                        />
                    </motion.div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {governanceCards.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.42 }}
                                className="rounded-3xl border border-slate-300/70 bg-white/65 p-6 shadow-xl backdrop-blur dark:border-white/15 dark:bg-white/10"
                            >
                                <h3 className="font-display text-2xl text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.body}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 md:pb-32">
                <motion.div
                    {...reveal}
                    className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-indigo-300/40 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-[0_30px_90px_-35px_rgba(79,70,229,0.85)] md:p-12"
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Final CTA</p>
                    <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                        Turn your knowledge into
                        <span className="block">trusted semantic answers.</span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50 md:text-base">
                        Launch a secure AI retrieval experience with production-ready indexing, relevance controls, and reliable query responses.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={isAuthenticated ? "/search" : "/login"}
                            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50"
                        >
                            {isAuthenticated ? "Open Search Workspace" : "Get Started"}
                        </Link>
                        <Link
                            href="/history"
                            className="rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                        >
                            See Retrieval History
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}