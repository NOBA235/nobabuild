"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./components/Logo";
/* ─────────────────────────────────────────────
   IMAGE PATHS — drop your own into /public/images
   The layout is designed to look great even with
   missing images (placeholders are built in).
───────────────────────────────────────────── */
const IMAGES = {
  hero: "/images/noba-hero.jpg",           // your photo, candid preferred
  building1: "/images/build-1.jpg",        // desk / laptop / workspace
  building2: "/images/build-2.jpg",        // whiteboard, sketches, anything real
  building3: "/images/build-3.jpg",        // you with a product, screenshot, etc
  vizo: "/images/vizo.png",
  morungx: "/images/morungx.png",
  evalyze: "/images/evalyze.png",
  anime: "/images/anime.png", 
  posturepet: "/images/posturepet.png",
  shepherd: "/images/shepherd.png",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "vizo",
    image: IMAGES.vizo,
    name: "Vizo AI",
    issue: "Vol. 01",
    status: "live" as const,
    lede: "The flagship. AI-powered STEM tutoring for students aged 13–18 across India — built entirely solo from Nagaland.",
    desc: "RAG over NCERT/CBSE PDFs, KaTeX math rendering, AI chapter summaries with PYQ exam prediction, real billing via Stripe & Razorpay. This is the product I'd want to have had in school.",
    tags: ["Next.js 15", "Supabase", "pgvector", "Gemini 2.5", "CBSE/NCERT/NBSE"],
    cats: ["edtech", "ai"],
    href: "https://vizo-pied-vercel.app",
  },
  {
    id: "morungx",
    image: IMAGES.morungx,
    name: "peers&shelf",
    issue: "Vol. 02",
    status: "built" as const,
    lede: "A student ecosystem built specifically for Nagaland — used books, notes sharing, peerlancing, campus directory.",
    desc: "Mobile-first for the NE India user base. Used book marketplace, LearnHub notes platform, PeerLancer, and an LMS with Zoom integration. Razorpay Route for payout infrastructure.",
    tags: ["Next.js", "Supabase", "Stripe", "Razorpay Route"],
    cats: ["edtech", "marketplace"],
    href: "",
  },
  {
    id: "evalyze",
    image: IMAGES.evalyze,
    name: "Evalyze",
    issue: "Vol. 03",
    status: "built" as const,
    lede: "AI answer sheet grader. Teachers upload sheets, Gemini evaluates and scores. Built in a weekend for Devpost.",
    desc: "MERN stack with Gemini 2.5 Flash doing the heavy lifting. Deployed to Vercel + Render. This is what hackathon pressure produces.",
    tags: ["MERN", "Gemini 2.5", "Vercel", "Render"],
    cats: ["ai"],
    href: "#",
  },
  {
    id: "anime",
    image: IMAGES.anime,
    name: "Anime Debate Club",
    issue: "Vol. 04",
    status: "built" as const,
    lede: "Real-time blind debate matchmaking. Two strangers, one topic, five minutes. No usernames.",
    desc: "Started with DynamoDB single-table design for the data model challenge, later migrated to MongoDB + PostgreSQL to eliminate free-tier costs. Live anonymous pairing.",
    tags: ["Real-time", "MongoDB", "PostgreSQL", "DynamoDB"],
    cats: ["fun", "ai"],
    href: "#",
  },
  {
    id: "posturepet",
    image: IMAGES.posturepet,
    name: "PosturePet AI",
    issue: "Vol. 05",
    status: "wip" as const,
    lede: "Sit up straight and your virtual pet evolves. Slouch and it suffers. Gamified posture detection via webcam.",
    desc: "TensorFlow.js MoveNet runs the pose estimation entirely in the browser. Skeleton overlay visualization, adaptive difficulty, pet evolution stages. Built because I slouch too much.",
    tags: ["TensorFlow.js", "MoveNet", "Next.js"],
    cats: ["fun", "ai"],
    href: "#",
  },
  {
    id: "shepherd",
    image: IMAGES.shepherd,
    name: "ShepherdAI",
    issue: "Vol. 06",
    status: "built" as const,
    lede: "Transport operations copilot for shared taxi (sumo) coordination and manifest tracking in Nagaland.",
    desc: "Community event logistics are genuinely chaotic here. This manages sumo/shared taxi coordination, manifest tracking, and route planning — Gemini handles the natural language operations layer.",
    tags: ["Next.js", "MongoDB", "Gemini"],
    cats: ["ai"],
    href: "#",
  },
];

const FIELD_NOTES = [
  {
    date: "2025",
    tag: "Behind the build",
    title: "How I shipped a full RAG pipeline solo in 3 weeks",
    excerpt: "No team, no office, no senior dev to ask. Just Supabase docs, pgvector cosine similarity math, and a lot of late nights in Nagaland. Here's what actually happened.",
    readTime: "6 min",
    img: IMAGES.building1,
  },
  {
    date: "2025",
    tag: "Founder notes",
    title: "Building for students who look like me",
    excerpt: "CBSE, NBSE, shared textbooks, power cuts before exams. The edtech market ignores Northeast India. Vizo AI exists because I lived the problem.",
    readTime: "4 min",
    img: IMAGES.building2,
  },
  {
    date: "2025",
    tag: "Hackathon debrief",
    title: "Devpost in 48 hours: what I built, what broke, what shipped",
    excerpt: "Evalyze went from idea to deployed product in a weekend. This is the honest debrief — the part that almost killed the demo, and the part that somehow worked.",
    readTime: "5 min",
    img: IMAGES.building3,
  },
];

const EXPERIENCE = [
  {
    icon: "🏛️",
    title: "Founder — Edx Morung",
    period: "2024 – present",
    sub: "Registered sole proprietorship · Nagaland, India",
    desc: "GST/Udyam registered. Building AI-powered edtech for students across CBSE, NCERT, NBSE, IGCSE, IB, and AP curricula. Razorpay Route for payout infrastructure across MorungX products.",
  },
  {
    icon: "📖",
    title: "Technical Author — Node.js Auth Ebook",
    period: "2025",
    sub: "Self-published · Production-grade guide",
    desc: "Wrote and published a production Node.js authentication guide with a full MERN companion codebase: JWT refresh rotation, Redis blacklisting, BullMQ, rate limiting. The book I wished existed when I started.",
  },
  {
    icon: "🏆",
    title: "Hackathon Builder",
    period: "2024 – 2025",
    sub: "Devpost · Moonshot Hackathon",
    desc: "Built Evalyze for Devpost. Competing in Moonshot with the Negative Results Engine — a zero-to-one research tool that surfaces failed experiments so researchers don't repeat dead ends. Uses existing RAG/embeddings experience.",
  },
  {
    icon: "💻",
    title: "Self-taught Full-stack Developer",
    period: "2023 – present",
    sub: "Learn-by-building approach",
    desc: "No bootcamp, no CS degree. Systematic self-study through React, MongoDB, and backend patterns while shipping production products in parallel. Backend-first by instinct, Next.js App Router as primary framework.",
  },
];

const STACK_SECTIONS = [
  {
    label: "Frontend",
    items: ["Next.js 15/16", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "TensorFlow.js"],
  },
  {
    label: "Backend & DB",
    items: ["Supabase", "PostgreSQL", "pgvector", "MongoDB", "DynamoDB", "Redis", "Node.js"],
  },
  {
    label: "AI & ML",
    items: ["Gemini 2.5 Flash", "OpenAI Embeddings", "RAG Pipelines", "pdf-parse", "MoveNet"],
  },
  {
    label: "Infra & Billing",
    items: ["Vercel", "Render", "Stripe", "Razorpay", "Razorpay Route", "BullMQ"],
  },
];

const FILTERS = ["All", "Edtech", "AI", "Marketplace", "Fun"] as const;
type Filter = (typeof FILTERS)[number];

const STATUS_META = {
  live:  { label: "Live now",  color: "#047857", bg: "#ECFDF5", dot: "#10B981" },
  built: { label: "Shipped",   color: "#1D4ED8", bg: "#EFF6FF", dot: "#3B82F6" },
  wip:   { label: "In progress", color: "#B45309", bg: "#FFFBEB", dot: "#F59E0B" },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Page() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === "All" || p.cats.includes(activeFilter.toLowerCase())
  );

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ---- Typewriter headline data ----
  const heroTextItems = [
    { text: "Hi," },
    { text: "I’m" },
    { text: "Noba" },
    { text: "—", br: true },
    { text: "Building" },
    { text: "AI" },
    { text: "products", br: true },
    { text: "from" },
    { text: "Northeast", em: true },
    { text: "India,", em: true, br: true },
    { text: "solo." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --paper: #F7F4EF;
          --ink: #1A1A18;
          --amber: #E8A020;
          --amber-light: #FDF3DC;
          --sage: #8A9E8A;
          --rule: #DDD9D0;
          --muted: #8A867C;
          --card-bg: #FFFEF9;
          --radius: 4px;
          --radius-lg: 8px;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        /* ── MASTHEAD NAV ── */
        .masthead {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--paper);
          border-bottom: 2px solid var(--ink);
          transition: box-shadow 0.2s;
        }
        .masthead.scrolled {
          box-shadow: 0 2px 20px rgba(26,26,24,0.08);
        }
        .masthead-inner {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 52px;
          gap: 1rem;
        }
        .masthead-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.0625rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-decoration: none;
        }
        .masthead-name em {
          font-style: normal;
          color: var(--muted);
          font-weight: 400;
        }
        .masthead-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
        }
        @media (max-width: 520px) { .masthead-links { display: none; } }
        .masthead-links a {
          font-size: 0.8125rem;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.02em;
          font-weight: 500;
          transition: color 0.15s;
        }
        .masthead-links a:hover { color: var(--ink); }
        .masthead-cta {
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.375rem 0.875rem;
          border: 1.5px solid var(--ink);
          border-radius: var(--radius);
          color: var(--ink);
          text-decoration: none;
          background: transparent;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
          font-family: 'Space Grotesk', sans-serif;
        }
        .masthead-cta:hover { background: var(--ink); color: var(--paper); }

        /* ── LAYOUT ── */
        .container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .section-gap { margin-top: 5rem; }
        @media (min-width: 768px) { .section-gap { margin-top: 6rem; } }

        hr.rule {
          border: none;
          border-top: 1px solid var(--rule);
          margin: 0;
        }
        hr.rule-heavy {
          border: none;
          border-top: 2px solid var(--ink);
          margin: 0;
        }

        /* ── EYEBROW LABEL ── */
        .eyebrow {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .eyebrow::before {
          content: '';
          width: 20px;
          height: 1.5px;
          background: var(--amber);
          display: inline-block;
          flex-shrink: 0;
        }

        /* ── TYPEWRITER ANIMATION ── */
        @keyframes typeWord {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .type-word {
          display: inline-block;
          opacity: 0;
          animation: typeWord 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          display: inline-block;
          margin-left: 0.125rem;
          font-weight: 300;
          animation: blink 1s step-end infinite;
        }

        /* ── HERO ── */
        .hero {
          padding: 4rem 1.5rem 3rem;
          max-width: 1040px;
          margin: 0 auto;
        }

        .hero-top {
          border-bottom: 1px solid var(--rule);
          padding-bottom: 1rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-dateline {
          font-size: 0.75rem;
          color: var(--muted);
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.04em;
        }
        .hero-dateline strong {
          color: var(--ink);
          font-weight: 600;
        }
        .open-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--amber-light);
          color: #92580C;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.03em;
          border: 1px solid #E8A02050;
        }
        .open-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--amber);
          animation: pulse-amber 2s infinite;
        }
        @keyframes pulse-amber {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .hero-layout { grid-template-columns: 1fr 340px; gap: 3.5rem; }
        }

        .hero-kicker {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--amber);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.625rem;
        }

        .hero-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.25rem, 6vw, 3.5rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 1.125rem;
        }
        .hero-headline em {
          font-style: italic;
          font-weight: 300;
          color: var(--muted);
        }

        .hero-lede {
          font-size: 1rem;
          color: #4A4740;
          line-height: 1.7;
          max-width: 38rem;
          margin-bottom: 1.75rem;
          border-left: 3px solid var(--amber);
          padding-left: 1rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
          margin-bottom: 1.5rem;
        }
        .btn-ink {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.625rem 1.25rem;
          background: var(--ink);
          color: var(--paper);
          border: 1.5px solid var(--ink);
          border-radius: var(--radius);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .btn-ink:hover { background: #2D2D2A; }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.625rem 1.25rem;
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--rule);
          border-radius: var(--radius);
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .btn-ghost:hover { border-color: var(--ink); background: #F0EDE6; }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--muted);
        }
        .hero-meta span { display: flex; align-items: center; gap: 0.3rem; }

        /* Hero photo column */
        .hero-photo-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .hero-photo-frame {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 2px solid var(--rule);
          aspect-ratio: 3/4;
          background: #EDE9E1;
        }
        .hero-photo-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .hero-photo-caption {
          font-size: 0.6875rem;
          color: var(--muted);
          font-style: italic;
          text-align: center;
          line-height: 1.4;
        }
        .hero-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .hero-stat {
          text-align: center;
          border: 1px solid var(--rule);
          border-radius: var(--radius);
          padding: 0.625rem 0.25rem;
          background: var(--card-bg);
        }
        .hero-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
        }
        .hero-stat-lbl {
          font-size: 0.625rem;
          color: var(--muted);
          margin-top: 0.2rem;
          letter-spacing: 0.03em;
        }

        /* ── ABOUT / PROCESS ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
          margin-top: 2rem;
        }
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }

        .about-body {
          font-size: 0.9375rem;
          color: #3A3830;
          line-height: 1.8;
        }
        .about-body p + p { margin-top: 1rem; }

        .about-highlight {
          background: var(--amber-light);
          border-left: 3px solid var(--amber);
          padding: 0.875rem 1rem;
          border-radius: 0 var(--radius) var(--radius) 0;
          margin: 1.25rem 0;
          font-size: 0.9rem;
          color: #5C4A10;
          font-style: italic;
          line-height: 1.6;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .process-step {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--rule);
        }
        .process-step:last-child { border-bottom: none; }
        .process-step-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--amber);
          width: 1.5rem;
          flex-shrink: 0;
          padding-top: 0.125rem;
        }
        .process-step-icon { font-size: 1rem; flex-shrink: 0; }
        .process-step-body { flex: 1; }
        .process-step-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.25rem;
        }
        .process-step-desc {
          font-size: 0.8125rem;
          color: var(--muted);
          line-height: 1.5;
        }

        /* ── PROJECTS ── */
        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .filter-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 1.25rem;
        }
        .filter-pill {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          border: 1.5px solid var(--rule);
          background: var(--card-bg);
          color: var(--muted);
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Space Grotesk', sans-serif;
        }
        .filter-pill:hover { border-color: var(--ink); color: var(--ink); }
        .filter-pill.active {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          border: 1.5px solid var(--ink);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--rule);
        }
        @media (min-width: 640px) {
          .projects-grid { grid-template-columns: 1fr 1fr; }
        }

        .proj-card {
          background: var(--card-bg);
          padding: 1.375rem;
          text-decoration: none;
          display: block;
          transition: background 0.15s;
          position: relative;
        }
        .proj-card:hover { background: var(--amber-light); }

        .proj-issue-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .proj-issue {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .proj-status {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.625rem;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 999px;
          font-family: 'Space Grotesk', sans-serif;
        }
        .proj-status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .proj-icon-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .proj-icon-img {
          width: 32px; height: 32px;
          border-radius: var(--radius);
          object-fit: cover;
          border: 1px solid var(--rule);
          flex-shrink: 0;
          background: #EDE9E1;
          overflow: hidden;
        }
        .proj-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-top: 0.125rem;
        }
        .proj-lede {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #3A3830;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        .proj-desc {
          font-size: 0.75rem;
          color: var(--muted);
          line-height: 1.55;
          margin-bottom: 0.875rem;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: auto;
        }
        .ptag {
          font-size: 0.625rem;
          font-weight: 500;
          padding: 2px 6px;
          border-radius: 2px;
          border: 1px solid var(--rule);
          color: var(--muted);
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.02em;
        }
        .proj-card:hover .ptag { border-color: #E8A02060; }

        /* ── FIELD NOTES / BLOG ── */
        .field-notes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (min-width: 640px) {
          .field-notes-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .field-notes-grid { grid-template-columns: 1fr 1fr 1fr; }
        }

        .note-card {
          border: 1px solid var(--rule);
          border-radius: var(--radius-lg);
          background: var(--card-bg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .note-card:hover {
          border-color: var(--amber);
          box-shadow: 0 4px 24px rgba(232, 160, 32, 0.1);
        }
        .note-img-wrap {
          aspect-ratio: 16/9;
          background: #EDE9E1;
          overflow: hidden;
          position: relative;
        }
        .note-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s;
        }
        .note-card:hover .note-img-wrap img { transform: scale(1.04); }
        .note-img-placeholder {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          background: linear-gradient(135deg, #EDE9E1, #DDD9D0);
        }
        .note-body { padding: 1.125rem; flex: 1; display: flex; flex-direction: column; }
        .note-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.625rem;
        }
        .note-tag {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--amber);
          font-family: 'Space Grotesk', sans-serif;
        }
        .note-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--rule); }
        .note-date { font-size: 0.6875rem; color: var(--muted); }
        .note-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin-bottom: 0.5rem;
        }
        .note-excerpt {
          font-size: 0.8125rem;
          color: var(--muted);
          line-height: 1.6;
          flex: 1;
        }
        .note-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.875rem;
          padding-top: 0.875rem;
          border-top: 1px solid var(--rule);
        }
        .note-read-time { font-size: 0.6875rem; color: var(--muted); }
        .note-arrow { font-size: 0.75rem; color: var(--amber); font-weight: 700; }

        /* ── STACK ── */
        .stack-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          border: 1.5px solid var(--ink);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--rule);
          margin-top: 2rem;
        }
        @media (min-width: 640px) {
          .stack-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .stack-cell {
          background: var(--card-bg);
          padding: 1.25rem 1rem;
        }
        .stack-cell-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 0.625rem;
        }
        .stack-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: #3A3830;
          padding: 0.3rem 0;
          border-bottom: 1px solid var(--rule);
          font-weight: 500;
        }
        .stack-item:last-child { border-bottom: none; }
        .stack-item::before {
          content: '';
          width: 4px; height: 4px;
          background: var(--amber);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── EXPERIENCE ── */
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1.5px solid var(--ink);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-top: 2rem;
        }
        .exp-item {
          display: flex;
          gap: 1rem;
          padding: 1.25rem 1.375rem;
          background: var(--card-bg);
          border-bottom: 1px solid var(--rule);
          transition: background 0.15s;
        }
        .exp-item:last-child { border-bottom: none; }
        .exp-item:hover { background: var(--amber-light); }
        .exp-icon-wrap {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius);
          background: var(--paper);
          border: 1px solid var(--rule);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .exp-body { flex: 1; min-width: 0; }
        .exp-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.2rem;
        }
        .exp-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .exp-period {
          font-size: 0.75rem;
          color: var(--muted);
          font-family: 'Space Grotesk', sans-serif;
          flex-shrink: 0;
        }
        .exp-sub { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.375rem; }
        .exp-desc { font-size: 0.8125rem; color: #4A4740; line-height: 1.6; }

        /* ── CONTACT ── */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 2rem;
          align-items: start;
        }
        @media (min-width: 640px) {
          .contact-layout { grid-template-columns: 1fr 1fr; }
        }
        .contact-card {
          border: 1.5px solid var(--ink);
          border-radius: var(--radius-lg);
          background: var(--card-bg);
          padding: 2rem;
        }
        .contact-card-dark {
          background: var(--ink);
          border-color: var(--ink);
        }
        .contact-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }
        .contact-headline-inv { color: var(--paper); }
        .contact-body {
          font-size: 0.875rem;
          color: #4A4740;
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }
        .contact-body-inv { color: #B0ADA5; }
        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--paper);
          text-decoration: none;
          padding: 0.625rem 0.875rem;
          border: 1px solid #FFFFFF20;
          border-radius: var(--radius);
          transition: background 0.15s, border-color 0.15s;
          font-family: 'Space Grotesk', sans-serif;
        }
        .contact-link:hover { background: #FFFFFF15; border-color: var(--amber); }
        .contact-link-icon { font-size: 1rem; }
        .contact-fact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .contact-fact {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.875rem;
          color: #4A4740;
          line-height: 1.5;
        }
        .contact-fact::before {
          content: '→';
          color: var(--amber);
          font-weight: 700;
          flex-shrink: 0;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* ── FOOTER ── */
        .footer {
          margin-top: 5rem;
          border-top: 2px solid var(--ink);
        }
        .footer-inner {
          max-width: 1040px;
          margin: 0 auto;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .footer-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--ink);
        }
        .footer-brand em { font-style: normal; color: var(--muted); font-weight: 400; }
        .footer-links-row { display: flex; gap: 1rem; }
        .footer-links-row a {
          font-size: 0.75rem;
          color: var(--muted);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .footer-links-row a:hover { color: var(--ink); }
        .footer-copy { font-size: 0.75rem; color: var(--muted); }

        /* ── UTILITY ── */
        .ghost-anchor { color: inherit; text-decoration: none; }
        .gh-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.15s;
        }
        .gh-link:hover { color: var(--ink); }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.625rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-top: 0.375rem;
        }

        /* ── PHOTOS STRIP ── */
        .photos-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-top: 2rem;
        }
        @media (min-width: 640px) { .photos-strip { gap: 0.875rem; } }
        .photo-item {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--rule);
          aspect-ratio: 4/3;
          background: #EDE9E1;
          position: relative;
        }
        .photo-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .photo-placeholder {
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          background: linear-gradient(135deg, #EDE9E1, #DDD9D0);
        }
        .photo-placeholder-icon { font-size: 1.5rem; }
        .photo-placeholder-text { font-size: 0.625rem; color: var(--muted); text-align: center; }
        .photo-caption {
          position: absolute;
          bottom: 0;
          left: 0; right: 0;
          background: linear-gradient(to top, rgba(26,26,24,0.7), transparent);
          padding: 1.5rem 0.625rem 0.5rem;
          font-size: 0.6875rem;
          color: rgba(247,244,239,0.9);
          font-style: italic;
        }
      `}</style>

      <div style={{ background: "var(--paper)", minHeight: "100vh" }}>

        {/* ── MASTHEAD ── */}
        <header className={`masthead${scrolled ? " scrolled" : ""}`}>
          <div className="masthead-inner">
           <Link href="/" style={{ display: "inline-flex" }}>
  <Logo variant="pill" size={38} />
</Link>
            <ul className="masthead-links">
              {[
                { label: "Work", id: "projects" },
                { label: "About", id: "about" },
                { label: "Field Notes", id: "field-notes" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => smoothScroll(e, item.id)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="masthead-cta">
              Résumé ↗
            </a>
          </div>
        </header>

        {/* ── HERO ── */}
        <div ref={heroRef}>
          <div className="hero">
            <div className="hero-top">
              <span className="hero-dateline">
                <strong>Nagaland, India</strong> — Solo founder &amp; full-stack developer
              </span>
              <span className="open-pill">
                Open to internships
              </span>
            </div>

            <div className="hero-layout">
              {/* Left: copy */}
              <div>
                <p className="hero-kicker">Est. 2023 · Edx Morung</p>
                <h1 className="hero-headline">
                  {heroTextItems.map((item, i) => {
                    const Tag = item.em ? "em" : "span";
                    return (
                      <Tag
                        key={i}
                        className="type-word"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        {item.text}
                        {item.br ? null : " "}
                      </Tag>
                    );
                  })}
                  <span className="cursor-blink" aria-hidden="true">|</span>
                </h1>
                <p className="hero-lede">
                  I&rsquo;m a self-taught developer and founder. I build real AI products —
                  RAG pipelines, billing systems, tutor apps — from Nagaland. Not proof of
                  concepts. Real things students use.
                </p>
                <div className="hero-actions">
                  <a href="#projects" onClick={(e) => smoothScroll(e, "projects")} className="btn-ink">
                    See the work →
                  </a>
                  <a href="#contact" onClick={(e) => smoothScroll(e, "contact")} className="btn-ghost">
                    Let&rsquo;s talk
                  </a>
                </div>
                <div className="hero-meta">
                  <span>📍 Nagaland, India</span>
                  <span>⚡ Next.js · Supabase · Gemini</span>
                  <span>🤝 Remote-friendly</span>
                </div>
              </div>

              {/* Right: photo + stats */}
              <div className="hero-photo-col">
                <div className="hero-photo-frame">
                  <Image
                    src={IMAGES.hero}
                    alt="Noba"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <p className="hero-photo-caption">
                  Building from Nagaland
                </p>
                <div className="hero-stats-row">
                  {[
                    { num: "6+", lbl: "Products shipped" },
                    { num: "3", lbl: "Hackathons" },
                    { num: "1", lbl: "Sole prop." },
                  ].map((s) => (
                    <div key={s.lbl} className="hero-stat">
                      <div className="hero-stat-num">{s.num}</div>
                      <div className="hero-stat-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="rule-heavy" />

        {/* ── ABOUT ── */}
        <section className="container section-gap" id="about">
          <div className="eyebrow">About</div>
          <div className="section-header-row" style={{ marginTop: "0.5rem" }}>
            <h2 className="section-title">The story behind the work</h2>
          </div>

          <div className="about-grid">
            <div>
              <div className="about-body">
                <p>
                  I&rsquo;m Noba — a self-taught developer and sole founder building from Nagaland,
                  Northeast India. No CS degree, no bootcamp, no team. Just a laptop, a relentless
                  curiosity for how things actually work, and a specific problem I couldn&rsquo;t stop
                  thinking about.
                </p>
                <div className="about-highlight">
                  "The edtech market pretends Northeast India doesn&rsquo;t exist. CBSE students here study
                  from shared photocopied textbooks. Vizo AI exists because I lived that problem."
                </div>
                <p>
                  I founded Edx Morung as a registered sole proprietorship (GST + Udyam) to give my
                  work a real structure. I&rsquo;ve shipped RAG pipelines, billing systems with Razorpay Route,
                  real-time apps, and a published Node.js auth ebook — all while figuring it out as I go.
                </p>
                <p>
                  I&rsquo;m backend-first by instinct, Next.js App Router as my primary framework, and I have
                  a deep habit of building things completely before considering if they&rsquo;re "good enough to ship."
                </p>
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>How I work</div>
              <div className="process-steps">
                {[
                  ["💡", "Find a real gap", "Problems I see in Nagaland and NE India — real people, real friction, not imagined user personas."],
                  ["🎨", "Design mobile-first", "Next.js App Router, Tailwind, and a lot of willingness to throw away the first layout."],
                  ["🤖", "Add the AI layer", "RAG pipelines, pgvector embeddings, Gemini 2.5 Flash — only when AI makes the product genuinely better."],
                  ["💳", "Wire up real billing", "Stripe and Razorpay Route from day one. Products that don't bill aren't products."],
                  ["🚀", "Ship and iterate", "Vercel + Render + Supabase. Real users, real feedback, real edge cases I didn't predict."],
                ].map(([icon, title, desc], i) => (
                  <div key={i} className="process-step">
                    <span className="process-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="process-step-icon">{icon}</span>
                    <div className="process-step-body">
                      <p className="process-step-title">{title}</p>
                      <p className="process-step-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Behind the scenes photos */}
          <div style={{ marginTop: "2.5rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Behind the scenes</p>
            <div className="photos-strip">
              <div className="photo-item">
                <Image
                  src={IMAGES.building1}
                  alt="Workspace"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="photo-caption">Late nights in Nagaland</div>
              </div>
              <div className="photo-item">
                <Image
                  src={IMAGES.building2}
                  alt="Planning sessions"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="photo-caption">Whiteboard before code</div>
              </div>
              <div className="photo-item">
                <Image
                  src={IMAGES.building3}
                  alt="Shipping days"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="photo-caption">When it finally works</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" style={{ marginTop: "5rem" }} />

        {/* ── PROJECTS ── */}
        <section className="container section-gap" id="projects">
          <div className="eyebrow">Work</div>
          <div className="section-header-row" style={{ marginTop: "0.5rem" }}>
            <h2 className="section-title">Things I&rsquo;ve built</h2>
            <a
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="gh-link"
            >
              GitHub ↗
            </a>
          </div>

          <div className="filter-strip">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-pill${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((p) => {
              const s = STATUS_META[p.status];
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className="proj-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="proj-issue-row">
                    <span className="proj-issue">{p.issue}</span>
                    <span
                      className="proj-status"
                      style={{ background: s.bg, color: s.color }}
                    >
                      <span className="proj-status-dot" style={{ background: s.dot }} />
                      {s.label}
                    </span>
                  </div>
                  <div className="proj-icon-row">
                    <div className="proj-icon-img">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={32}
                        height={32}
                        style={{ objectFit: "cover", borderRadius: "var(--radius)" }}
                      />
                    </div>
                    <p className="proj-name">{p.name}</p>
                  </div>
                  <p className="proj-lede">{p.lede}</p>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="ptag">{t}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <hr className="rule" style={{ marginTop: "5rem" }} />

        {/* ── FIELD NOTES ── */}
        <section className="container section-gap" id="field-notes">
          <div className="eyebrow">Field Notes</div>
          <div className="section-header-row" style={{ marginTop: "0.5rem" }}>
            <h2 className="section-title">From the build log</h2>
            <a href="#" className="gh-link">All notes →</a>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", maxWidth: "36rem", lineHeight: "1.6" }}>
            Behind-the-scenes writing on building products, surviving hackathons, and
            shipping from a place most SaaS founders have never heard of.
          </p>

          <div className="field-notes-grid">
            {FIELD_NOTES.map((note, i) => (
              <a key={i} href="#" className="note-card">
                <div className="note-img-wrap">
                  <Image
                    src={note.img}
                    alt={note.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="note-body">
                  <div className="note-meta">
                    <span className="note-tag">{note.tag}</span>
                    <span className="note-dot" />
                    <span className="note-date">{note.date}</span>
                  </div>
                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-excerpt">{note.excerpt}</p>
                  <div className="note-footer">
                    <span className="note-read-time">☕ {note.readTime} read</span>
                    <span className="note-arrow">Read →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr className="rule" style={{ marginTop: "5rem" }} />

        {/* ── STACK ── */}
        <section className="container section-gap" id="stack">
          <div className="eyebrow">Stack</div>
          <div className="section-header-row" style={{ marginTop: "0.5rem" }}>
            <h2 className="section-title">Tools I actually use</h2>
          </div>
          <div className="stack-grid">
            {STACK_SECTIONS.map((sec) => (
              <div key={sec.label} className="stack-cell">
                <p className="stack-cell-label">{sec.label}</p>
                {sec.items.map((item) => (
                  <div key={item} className="stack-item">{item}</div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" style={{ marginTop: "5rem" }} />

        {/* ── EXPERIENCE ── */}
        <section className="container section-gap" id="experience">
          <div className="eyebrow">Background</div>
          <div className="section-header-row" style={{ marginTop: "0.5rem" }}>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="exp-list">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-item">
                <div className="exp-icon-wrap">{e.icon}</div>
                <div className="exp-body">
                  <div className="exp-row">
                    <span className="exp-title">{e.title}</span>
                    <span className="exp-period">{e.period}</span>
                  </div>
                  <p className="exp-sub">{e.sub}</p>
                  <p className="exp-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" style={{ marginTop: "5rem" }} />

        {/* ── CONTACT ── */}
        <section className="container section-gap" id="contact">
          <div className="eyebrow">Contact</div>
          <div className="section-header-row" style={{ marginTop: "0.5rem" }}>
            <h2 className="section-title">Let&rsquo;s build something</h2>
          </div>
          <div className="contact-layout">
            {/* Dark card with links */}
            <div className="contact-card contact-card-dark">
              <h3 className="contact-headline contact-headline-inv">
                Frontend &amp; full‑stack intern.<br />
                Remote-friendly. Available now.
              </h3>
              <p className="contact-body contact-body-inv">
                I have production experience shipping AI products solo —
                RAG pipelines, real billing, and mobile-first UIs. If
                you&rsquo;re building something I&rsquo;d care about, let&rsquo;s talk.
              </p>
              <div className="contact-links">
                <a href="mailto:your@email.com" className="contact-link">
                  <span className="contact-link-icon">✉️</span>
                  your@email.com
                </a>
                <a
                  href="https://linkedin.com/in/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span className="contact-link-icon">💼</span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span className="contact-link-icon">🐙</span>
                  GitHub
                </a>
                <a
                  href="https://twitter.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <span className="contact-link-icon">🐦</span>
                  Twitter / X
                </a>
              </div>
            </div>

            {/* Light card — what I bring */}
            <div className="contact-card">
              <h3 className="contact-headline">What I bring</h3>
              <ul className="contact-fact-list">
                {[
                  "Full AI feature development: RAG pipelines, embeddings, Gemini / OpenAI integration",
                  "Real billing wired from day one — Stripe and Razorpay, including Razorpay Route payouts",
                  "Next.js App Router, Supabase, pgvector — production experience, not tutorials",
                  "Backend-first thinking with full-stack delivery",
                  "Self-directed, async-friendly — I'm used to working alone",
                  "I ship things. Not demos. Not proof-of-concepts. Things.",
                ].map((fact, i) => (
                  <li key={i} className="contact-fact">{fact}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <span className="footer-brand">
              Noba <em>· Edx Morung</em>
            </span>
            <div className="footer-links-row">
              {["Work", "About", "Field Notes", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}>
                  {l}
                </a>
              ))}
            </div>
            <span className="footer-copy">© {new Date().getFullYear()} Edx Morung</span>
          </div>
        </footer>

      </div>
    </>
  );
}