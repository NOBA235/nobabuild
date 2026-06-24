"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────
   IMAGE IMPORTS (add your own in /public/images)
───────────────────────────────────────────── */
const IMAGES = {
  vizo: "/images/vizo.png",
  morungx: "/images/morungx.png",
  evalyze: "/images/evalyze.png",
  anime: "/images/anime.png",
  posturepet: "/images/posturepet.png",
  shepherd: "/images/shepherd.png",
  avatar1: "/images/avatar1.png",
  avatar2: "/images/avatar2.png",
  avatar3: "/images/avatar3.png",
  avatar4: "/images/avatar4.png",
  hero: "/images/hero-illustration.png",
  footerIcon: "/images/footer-icon.png",
} as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "vizo",
    image: IMAGES.vizo,
    name: "Vizo AI",
    status: "live" as const,
    desc: "AI-powered STEM tutoring for students aged 13–18. RAG over educational PDFs, KaTeX math rendering, AI chapter summaries, PYQ-based exam prediction, Stripe & Razorpay billing.",
    tags: ["Next.js 15", "Supabase", "pgvector", "Gemini 2.5", "CBSE/NCERT/NBSE"],
    cats: ["edtech", "ai"],
    href: "https://vizo.ai", // replace with real URL
  },
  {
    id: "morungx",
    image: IMAGES.morungx,
    name: "MorungX / NagaShelf",
    status: "built" as const,
    desc: "Student ecosystem for Nagaland — used book marketplace, notes sharing (LearnHub), peerlancing, campus directory, and an LMS with Zoom. Mobile-first for the NE India user base.",
    tags: ["Next.js", "Supabase", "Stripe", "Razorpay Route"],
    cats: ["edtech", "marketplace"],
    href: "https://morungx.com", // replace
  },
  {
    id: "evalyze",
    image: IMAGES.evalyze,
    name: "Evalyze",
    status: "built" as const,
    desc: "AI answer sheet grading platform built for Devpost. Teachers upload sheets, Gemini 2.5 Flash evaluates and scores responses. Deployed to Vercel + Render.",
    tags: ["MERN", "Gemini 2.5", "Vercel", "Render"],
    cats: ["ai"],
    href: "#",
  },
  {
    id: "anime",
    image: IMAGES.anime,
    name: "Anime Debate Club",
    status: "built" as const,
    desc: "Real-time blind debate matchmaking. DynamoDB single-table design, later migrated to MongoDB + PostgreSQL for free-tier cost elimination. Live anonymous pairing.",
    tags: ["Real-time", "MongoDB", "PostgreSQL", "DynamoDB"],
    cats: ["fun", "ai"],
    href: "#",
  },
  {
    id: "posturepet",
    image: IMAGES.posturepet,
    name: "PosturePet AI",
    status: "wip" as const,
    desc: "Gamified posture detection using TensorFlow.js MoveNet. Pet evolution stages based on posture score, skeleton overlay visualization. Sit up straight to level up your pet.",
    tags: ["TensorFlow.js", "MoveNet", "Next.js"],
    cats: ["fun", "ai"],
    href: "#",
  },
  {
    id: "shepherd",
    image: IMAGES.shepherd,
    name: "ShepherdAI",
    status: "built" as const,
    desc: "Transport operations copilot for community event logistics in Nagaland. Manages sumo/shared taxi coordination, manifest tracking, and route planning with Gemini.",
    tags: ["Next.js", "MongoDB", "Gemini"],
    cats: ["ai"],
    href: "#",
  },
];

const EXPERIENCE = [
  {
    icon: "🏛️",
    title: "Founder — Edx Morung / MorungX",
    period: "2024 – present",
    sub: "Sole proprietorship · Nagaland, India",
    desc: "Registered sole prop building AI-powered edtech for students across CBSE, NCERT, NBSE, IGCSE, IB, and AP curricula. GST/Udyam registered. Razorpay Route for payout infrastructure.",
  },
  {
    icon: "📖",
    title: "Technical Author — Node.js Auth Ebook",
    period: "2025",
    sub: "Self-published · Production-grade guide",
    desc: "Production-grade Node.js authentication ebook with full MERN companion codebase: JWT refresh rotation, Redis blacklisting, BullMQ, and rate limiting.",
  },
  {
    icon: "🏆",
    title: "Hackathon Participant",
    period: "2024 – 2025",
    sub: "Devpost · Moonshot",
    desc: "Built Evalyze for Devpost. Competing in Moonshot Hackathon with the Negative Results Engine — a zero-to-one idea leveraging existing RAG and embeddings experience.",
  },
  {
    icon: "💻",
    title: "Self-taught Full-stack Developer",
    period: "2023 – present",
    sub: "Learn-by-building approach",
    desc: "Systematic self-study through React, MongoDB, and backend patterns while shipping production products in parallel. Backend-first with Next.js App Router as primary frontend framework.",
  },
];

const ROADMAP = [
  {
    icon: "🧠",
    title: "Negative Results Engine",
    status: "active" as const,
    desc: "Moonshot Hackathon entry — surfaces failed experiments so researchers don't repeat dead ends. RAG + embeddings core.",
  },
  {
    icon: "🚕",
    title: "Sumo Booking SaaS",
    status: "soon" as const,
    desc: "B2B SaaS for shared taxi booking and manifest management for intercity counter operators in NE India.",
  },
  {
    icon: "🖥️",
    title: "Terminal Portfolio v2",
    status: "soon" as const,
    desc: "Gamified OS-aesthetic portfolio — XP/HUD elements, quest-style project cards, dark terminal theme in Next.js.",
  },
  {
    icon: "📄",
    title: "Internship Applications",
    status: "soon" as const,
    desc: "Frontend and full-stack Typst resumes targeting remote internship roles. Applications actively in progress.",
  },
  {
    icon: "📚",
    title: "Vizo AI v2",
    status: "later" as const,
    desc: "Expand to AP and IB curricula, add voice tutor, improve PYQ prediction accuracy with fine-tuned embeddings.",
  },
  {
    icon: "🤝",
    title: "Peerlancer Marketplace",
    status: "later" as const,
    desc: "Spin up the tutoring and peerlancing marketplace from MorungX as a standalone product with Razorpay Route payouts.",
  },
];

const STACK = [
  "Next.js 15/16", "Supabase", "pgvector", "Gemini 2.5 Flash",
  "OpenAI Embeddings", "TypeScript", "Stripe", "Razorpay",
  "MongoDB", "MERN", "TensorFlow.js", "Tailwind CSS",
];

const FILTERS = ["All", "Edtech", "AI", "Marketplace", "Fun"] as const;
type Filter = (typeof FILTERS)[number];

const STATUS_STYLES = {
  live:  { label: "Live",      bg: "#ECFDF5", color: "#047857" },
  built: { label: "Built",     bg: "#EEF2FF", color: "#4338CA" },
  wip:   { label: "WIP",       bg: "#FEF3C7", color: "#B45309" },
};

const ROADMAP_STYLES = {
  active: { label: "Active", bg: "#ECFDF5", color: "#047857" },
  soon:   { label: "Soon",   bg: "#EEF2FF", color: "#4338CA" },
  later:  { label: "Later",  bg: "#F4F4F5", color: "#52525B" },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Page() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [showRoadmap, setShowRoadmap] = useState(false);

  const filteredProjects = PROJECTS.filter((p) =>
    activeFilter === "All" || p.cats.includes(activeFilter.toLowerCase())
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <style>{`
        /* ── Reset ─────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ──────────────────────────────── */
        .pc {
          background: #FAFAFA;
          color: #18181B;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          line-height: 1.5;
          min-height: 100vh;
        }

        /* ── Layout ────────────────────────────── */
        .section {
          padding: 3rem 1.25rem;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (min-width: 640px) { .section { padding: 4rem 1.5rem; } }
        @media (min-width: 1024px) { .section { padding: 5rem 2rem; } }

        .divider {
          border: none;
          border-top: 1px solid #E4E4E7;
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── Typography ────────────────────────── */
        .label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #A1A1AA;
        }
        .h1 {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
          color: #18181B;
        }
        @media (min-width: 640px) { .h1 { font-size: 2.25rem; } }
        .h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #18181B;
        }
        .body {
          font-size: 0.9rem;
          color: #52525B;
          line-height: 1.65;
        }
        .muted { font-size: 0.8rem; color: #A1A1AA; }

        /* ── Buttons ───────────────────────────── */
        .btn-primary {
          display: inline-block;
          border-radius: 0.5rem;
          background: #18181B;
          border: none;
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: #FAFAFA;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .btn-primary:hover { opacity: 0.8; }
        .btn-outline {
          display: inline-block;
          border-radius: 0.5rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: #18181B;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s;
        }
        .btn-outline:hover { border-color: #A1A1AA; }

        /* ── Nav ───────────────────────────────── */
        .nav-wrapper {
          border-bottom: 1px solid #E4E4E7;
          background: rgba(250,250,250,0.9);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          max-width: 900px;
          margin: 0 auto;
          gap: 1rem;
        }
        .nav-brand {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #18181B;
          text-decoration: none;
        }
        .nav-brand span { color: #A1A1AA; font-weight: 400; }
        .nav-links {
          display: flex;
          gap: 1.25rem;
        }
        @media (max-width: 480px) { .nav-links { display: none; } }
        .nav-links a {
          font-size: 0.8125rem;
          color: #52525B;
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-links a:hover { color: #18181B; }
        .nav-cta {
          border-radius: 0.5rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 0.375rem 0.875rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #18181B;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .nav-cta:hover { background: #F4F4F5; }

        /* ── Hero ──────────────────────────────── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }

        .avatar-stack {
          display: flex;
          margin-bottom: 0.75rem;
        }
        .av {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6875rem;
          font-weight: 600;
          margin-right: -10px;
          flex-shrink: 0;
          object-fit: cover;
        }
        .av-1 { background: #EEEDFE; z-index: 4; }
        .av-2 { background: #E1F5EE; z-index: 3; }
        .av-3 { background: #FAECE7; z-index: 2; }
        .av-4 { background: #FAEEDA; z-index: 1; }

        .live-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          background: #ECFDF5;
          color: #047857;
          margin-bottom: 0.875rem;
        }
        .live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10B981;
          display: inline-block;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
          margin-top: 1.25rem;
        }
        .hero-free-text {
          font-size: 0.7rem;
          color: #A1A1AA;
          margin-top: 0.875rem;
        }

        .hero-stats-card {
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 1.25rem;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-size: 1.375rem;
          font-weight: 700;
          color: #18181B;
          line-height: 1;
        }
        .stat-lbl {
          font-size: 0.6875rem;
          color: #A1A1AA;
          margin-top: 0.25rem;
        }
        .stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          border-top: 1px solid #F4F4F5;
          padding-top: 0.875rem;
          margin-top: 0.5rem;
        }
        .stag {
          font-size: 0.6875rem;
          padding: 3px 8px;
          border-radius: 0.375rem;
          border: 1px solid #E4E4E7;
          background: #FAFAFA;
          color: #52525B;
        }

        /* ── How It Works ──────────────────────── */
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.625rem;
          margin-top: 1.25rem;
        }
        @media (min-width: 640px) { .steps-grid { grid-template-columns: repeat(4, 1fr); } }
        .step-card {
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 1rem;
          transition: border-color 0.2s;
        }
        .step-card:hover { border-color: #A1A1AA; }
        .step-number {
          font-size: 0.7rem;
          font-weight: 600;
          color: #D4D4D8;
          margin-bottom: 0.625rem;
        }
        .step-icon { font-size: 1.125rem; margin-bottom: 0.375rem; }
        .step-title { font-size: 0.8125rem; font-weight: 600; color: #18181B; }
        .step-desc {
          font-size: 0.75rem;
          color: #71717A;
          line-height: 1.4;
          margin-top: 0.25rem;
        }

        /* ── Projects ──────────────────────────── */
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          gap: 1rem;
        }
        .view-all {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #18181B;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .view-all:hover { text-decoration: none; }

        .filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 1rem;
        }
        .filter-btn {
          font-size: 0.75rem;
          padding: 4px 14px;
          border-radius: 999px;
          border: 1px solid #E4E4E7;
          background: white;
          color: #52525B;
          cursor: pointer;
          transition: all 0.15s;
        }
        .filter-btn:hover { border-color: #A1A1AA; }
        .filter-btn.active {
          background: #18181B;
          color: white;
          border-color: #18181B;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.625rem;
        }
        @media (min-width: 600px) { .projects-grid { grid-template-columns: 1fr 1fr; } }

        .proj-card {
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 1.125rem;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: block;
        }
        .proj-card:hover {
          border-color: #A1A1AA;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .proj-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .proj-icon-img {
          width: 28px;
          height: 28px;
          border-radius: 0.375rem;
        }
        .proj-status-badge {
          font-size: 0.6875rem;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .proj-name { font-size: 0.875rem; font-weight: 600; color: #18181B; }
        .proj-desc { font-size: 0.8125rem; color: #52525B; line-height: 1.5; margin-top: 0.25rem; }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 0.75rem;
        }
        .ptag {
          font-size: 0.6875rem;
          padding: 2px 7px;
          border-radius: 0.375rem;
          border: 1px solid #E4E4E7;
          color: #71717A;
        }

        /* ── Experience ────────────────────────── */
        .exp-list { display: flex; flex-direction: column; gap: 0.625rem; }
        .exp-item {
          display: flex;
          gap: 0.875rem;
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 1rem 1.125rem;
          transition: border-color 0.2s;
        }
        .exp-item:hover { border-color: #A1A1AA; }
        .exp-icon { font-size: 1.125rem; margin-top: 2px; flex-shrink: 0; }
        .exp-body { flex: 1; min-width: 0; }
        .exp-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .exp-title { font-size: 0.875rem; font-weight: 600; color: #18181B; }
        .exp-period { font-size: 0.75rem; color: #A1A1AA; flex-shrink: 0; }
        .exp-sub { font-size: 0.75rem; color: #A1A1AA; margin-top: 2px; }
        .exp-desc { font-size: 0.8125rem; color: #52525B; line-height: 1.5; margin-top: 0.375rem; }

        /* ── CTA Banner ────────────────────────── */
        .cta-card {
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 2rem;
          text-align: center;
          max-width: 440px;
          margin: 0 auto;
        }
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.625rem;
          margin-top: 1.25rem;
        }

        /* ── Roadmap ───────────────────────────── */
        .roadmap-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .toggle-btn {
          border-radius: 0.5rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 0.375rem 0.875rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #18181B;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .toggle-btn:hover { border-color: #A1A1AA; }
        .roadmap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.625rem;
        }
        @media (min-width: 640px) { .roadmap-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px) { .roadmap-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .rm-item {
          display: flex;
          gap: 0.625rem;
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: white;
          padding: 1rem;
          transition: border-color 0.2s;
        }
        .rm-item:hover { border-color: #A1A1AA; }
        .rm-icon { font-size: 1rem; flex-shrink: 0; margin-top: 2px; }
        .rm-title { font-size: 0.8125rem; font-weight: 600; color: #18181B; }
        .rm-status-badge {
          font-size: 0.625rem;
          font-weight: 500;
          padding: 1px 6px;
          border-radius: 999px;
          vertical-align: middle;
          margin-left: 5px;
        }
        .rm-desc { font-size: 0.75rem; color: #71717A; line-height: 1.4; margin-top: 0.25rem; }

        /* ── Footer ────────────────────────────── */
        .footer {
          border-top: 1px solid #E4E4E7;
          padding: 1.5rem 1.25rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .footer-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.875rem;
          text-align: center;
        }
        @media (min-width: 640px) {
          .footer-inner {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-brand-icon {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.375rem;
          background: #18181B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: white;
          overflow: hidden;
        }
        .footer-brand-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .footer-brand-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: #18181B;
        }
        .footer-brand-name span { color: #A1A1AA; font-weight: 400; }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .footer-links a {
          font-size: 0.75rem;
          color: #71717A;
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-links a:hover { color: #18181B; }
        .footer-copy { font-size: 0.75rem; color: #A1A1AA; }
      `}</style>

      <div className="pc">

        {/* ── NAV ──────────────────────────────── */}
        <div className="nav-wrapper">
          <nav className="nav">
            <Link href="/" className="nav-brand">
              Noba<span> · Edx Morung</span>
            </Link>
            <div className="nav-links">
              {[
                { label: "Projects", id: "projects" },
                { label: "Experience", id: "experience" },
                { label: "Roadmap", id: "roadmap" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Resume ↗
            </a>
          </nav>
        </div>

        {/* ── HERO ─────────────────────────────── */}
        <section className="section" id="hero">
          <div className="hero-grid">
            <div>
              <div className="avatar-stack">
                <Image src={IMAGES.avatar1} alt="VZ" width={36} height={36} className="av av-1" />
                <Image src={IMAGES.avatar2} alt="EV" width={36} height={36} className="av av-2" />
                <Image src={IMAGES.avatar3} alt="AN" width={36} height={36} className="av av-3" />
                <Image src={IMAGES.avatar4} alt="MX" width={36} height={36} className="av av-4" />
              </div>
              <span className="live-pill">
                <span className="live-dot" />
                Open to internships
              </span>
              <h1 className="h1">
                Solo founder building AI products for students in Nagaland
              </h1>
              <p className="body" style={{ marginTop: "0.625rem" }}>
                I&rsquo;m a frontend &amp; full‑stack developer and founder behind Edx Morung
                and Vizo AI — shipping real products with RAG pipelines, Supabase,
                and Gemini from Nagaland, India.
              </p>
              <div className="hero-buttons">
                <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="btn-primary">
                  View Projects →
                </a>
                <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="btn-outline">
                  Get in touch
                </a>
              </div>
              <p className="hero-free-text">
                Next.js · Supabase · Gemini · pgvector · Tailwind
              </p>
            </div>

            <div className="hero-stats-card">
              <p className="label" style={{ marginBottom: "0.875rem" }}>By the numbers</p>
              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-num">6+</div>
                  <div className="stat-lbl">Products shipped</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">3</div>
                  <div className="stat-lbl">Hackathons</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">1</div>
                  <div className="stat-lbl">Sole prop.</div>
                </div>
              </div>
              <p className="label">Core stack</p>
              <div className="stack-tags">
                {STACK.map((t) => (
                  <span key={t} className="stag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── HOW IT WORKS ─────────────────────── */}
        <section className="section">
          <p className="label">How I work</p>
          <h2 className="h2">From idea to production, solo</h2>
          <div className="steps-grid">
            {[
              ["💡", "Spot a gap", "Real problems in Nagaland / NE India — students, logistics, edtech"],
              ["🎨", "Design fast", "Mobile-first UI, Next.js App Router, Tailwind CSS system"],
              ["🤖", "Add AI", "RAG pipelines, embeddings, Gemini 2.5, pgvector cosine similarity"],
              ["🚀", "Ship it", "Vercel / Render, Supabase, real billing with Stripe & Razorpay"],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="step-card">
                <p className="step-number">{String(i + 1).padStart(2, "0")}</p>
                <div className="step-icon">{icon}</div>
                <p className="step-title">{title}</p>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ── PROJECTS ─────────────────────────── */}
        <section className="section" id="projects">
          <div className="section-header">
            <div>
              <p className="label">Portfolio</p>
              <h2 className="h2" style={{ marginTop: "0.25rem" }}>Projects I&rsquo;ve built</h2>
            </div>
            <a
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="view-all"
            >
              GitHub →
            </a>
          </div>

          <div className="filter-row">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((p) => {
              const s = STATUS_STYLES[p.status];
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className="proj-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="proj-header">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={28}
                      height={28}
                      className="proj-icon-img"
                    />
                    <span
                      className="proj-status-badge"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="proj-name">{p.name}</p>
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

        <hr className="divider" />

        {/* ── EXPERIENCE ───────────────────────── */}
        <section className="section" id="experience">
          <p className="label">Background</p>
          <h2 className="h2" style={{ marginTop: "0.25rem", marginBottom: "1.25rem" }}>
            Experience
          </h2>
          <div className="exp-list">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-item">
                <div className="exp-icon">{e.icon}</div>
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

        <hr className="divider" />

        {/* ── CTA BANNER ───────────────────────── */}
        <section className="section" style={{ textAlign: "center" }}>
          <div className="cta-card">
            <p className="label">Get started</p>
            <h2 className="h2" style={{ marginTop: "0.375rem" }}>
              Looking for a frontend or full‑stack intern?
            </h2>
            <p className="body" style={{ marginTop: "0.5rem", maxWidth: "22rem", margin: "0.5rem auto 0" }}>
              I bring production experience shipping AI products from scratch, solo —
              RAG pipelines, real billing, and mobile-first UIs.
            </p>
            <div className="cta-buttons">
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="btn-primary">
                Get in touch →
              </a>
              <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── ROADMAP ──────────────────────────── */}
        <section className="section" id="roadmap">
          <div className="roadmap-header">
            <div>
              <p className="label">Roadmap</p>
              <h2 className="h2" style={{ marginTop: "0.25rem" }}>What&rsquo;s coming next</h2>
            </div>
            <button
              className="toggle-btn"
              onClick={() => setShowRoadmap(!showRoadmap)}
            >
              {showRoadmap ? "Collapse ▲" : "Expand ▼"}
            </button>
          </div>

          {showRoadmap && (
            <div className="roadmap-grid">
              {ROADMAP.map((r) => {
                const st = ROADMAP_STYLES[r.status];
                return (
                  <div key={r.title} className="rm-item">
                    <div className="rm-icon">{r.icon}</div>
                    <div>
                      <p className="rm-title">
                        {r.title}
                        <span
                          className="rm-status-badge"
                          style={{ background: st.bg, color: st.color }}
                        >
                          {st.label}
                        </span>
                      </p>
                      <p className="rm-desc">{r.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <hr className="divider" />

        {/* ── CONTACT ──────────────────────────── */}
        <section className="section" id="contact">
          <div className="cta-card">
            <p className="label">Contact</p>
            <h2 className="h2" style={{ marginTop: "0.375rem" }}>
              Open to internship opportunities
            </h2>
            <p className="body" style={{ marginTop: "0.5rem", maxWidth: "22rem", margin: "0.5rem auto 0" }}>
              Frontend and full‑stack roles. Remote‑friendly. Let&rsquo;s build something.
            </p>
            <div className="cta-buttons">
              <a href="mailto:your@email.com" className="btn-primary">
                Email me →
              </a>
              <a
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Image src={IMAGES.footerIcon} alt="Edx Morung" width={24} height={24} />
              </div>
              <span className="footer-brand-name">
                Noba<span> · Edx Morung</span>
              </span>
            </div>
            <div className="footer-links">
              {["Projects", "Experience", "Roadmap", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => handleNavClick(e, l.toLowerCase())}>
                  {l}
                </a>
              ))}
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} Edx Morung</p>
          </div>
        </footer>
      </div>
    </>
  );
}