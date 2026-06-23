// app/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Mail,
  Folder,
  Code,
  Briefcase,
  GraduationCap,
  Image,
  Trophy,
  FileText,
  Zap,
  MapPin,
  Star,
  ArrowUpRight,
  ChevronRight,
  X,
  Minus,
  Square,
} from 'lucide-react';

// ---------- Types ----------
interface WindowState {
  id: string;
  key: string;
  title: string;
  crumb: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { w: number; h: number };
  minimized: boolean;
  maximized: boolean;
  prevSize?: { w: number; h: number; x: number; y: number };
  zIndex: number;
}

interface Achievement {
  id: string;
  title: string;
  desc: string;
  emoji: string;
}

// ---------- Content Data ----------
const sections = {
  projects: {
    title: 'projects',
    crumb: '~/noba/projects',
    icon: <Folder className="text-blue-400" size={18} />,
    content: (
      <div>
        <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">featured work</div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">Things I've Built</h2>
        <p className="text-sm text-gray-400 mb-6">Solo-built, shipped, and maintained from Nagaland. AI-powered edtech, developer tools, and community platforms.</p>
        <ProjectsFilter />
      </div>
    ),
  },
  skills: {
    title: 'skills.json',
    crumb: '~/noba/skills',
    icon: <Code className="text-green-400" size={18} />,
    content: <SkillsContent />,
  },
  experience: {
    title: 'experience.md',
    crumb: '~/noba/work',
    icon: <Briefcase className="text-purple-400" size={18} />,
    content: <ExperienceContent />,
  },
  education: {
    title: 'education.txt',
    crumb: '~/noba/edu',
    icon: <GraduationCap className="text-orange-400" size={18} />,
    content: <EducationContent />,
  },
  gallery: {
    title: 'gallery/',
    crumb: '~/noba/gallery',
    icon: <Image className="text-sky-400" size={18} />,
    content: <GalleryContent />,
  },
  achievements: {
    title: 'wins.log',
    crumb: '~/noba/wins',
    icon: <Trophy className="text-yellow-400" size={18} />,
    content: <AchievementsContent />,
  },
  contact: {
    title: 'contact.card',
    crumb: '~/noba/contact',
    icon: <Mail className="text-emerald-400" size={18} />,
    content: <ContactContent />,
  },
  resume: {
    title: 'resume.typst',
    crumb: '~/noba/resume',
    icon: <FileText className="text-violet-400" size={18} />,
    content: <ResumeContent />,
  },
};

// ---------- Sub-components for window content ----------
function ProjectsFilter() {
  const [filter, setFilter] = useState('all');
  const projects = [
    { cat: 'ai', title: 'Vizo AI', tag: 'AI · Edtech', desc: 'AI STEM tutoring platform for ages 13–18. RAG over educational PDFs, KaTeX math rendering, chapter summariser, PYQ-based exam prediction.', stack: ['Next.js 15', 'Supabase', 'pgvector', 'Gemini 2.5', 'OpenAI Embeddings', 'Stripe'] },
    { cat: 'ai', title: 'Evalyze', tag: 'AI · Grading', desc: 'AI answer-sheet grading platform. Gemini 2.5 Flash grades handwritten/typed answers with rubric-based feedback.', stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Gemini 2.5'] },
    { cat: 'fs', title: 'MorungX / NagaShelf', tag: 'Full Stack', desc: 'Student ecosystem for Nagaland: used-book marketplace, NBSE notes sharing, peerlancing, campus directory, LMS with Zoom.', stack: ['Next.js', 'Supabase', 'Tailwind', 'Stripe', 'Razorpay'] },
    { cat: 'ai', title: 'PosturePet AI', tag: 'AI · Browser', desc: 'Gamified posture detection using TensorFlow.js MoveNet. Real-time skeleton overlay + pet evolution.', stack: ['TensorFlow.js', 'MoveNet', 'React', 'Canvas API'] },
    { cat: 'fs', title: 'ShepherdAI', tag: 'Full Stack', desc: 'Transport operations copilot for community event logistics in Northeast India.', stack: ['Next.js', 'MongoDB', 'Gemini'] },
    { cat: 'fs', title: 'Anime Debate Club', tag: 'Full Stack', desc: 'Real-time blind debate matchmaking — users paired anonymously to debate anime topics.', stack: ['React', 'Node.js', 'WebSockets', 'DynamoDB', 'MongoDB'] },
    { cat: 'tool', title: 'Node.js Auth Ebook', tag: 'Technical Writing', desc: 'Production-grade authentication guide with full MERN companion codebase.', stack: ['Node.js', 'JWT', 'Redis', 'BullMQ', 'MERN'] },
    { cat: 'fs', title: 'Terminal Portfolio', tag: 'Portfolio', desc: 'Previous portfolio with dark OS aesthetic, XP/HUD elements, quest-style cards.', stack: ['Next.js', 'Tailwind', 'Framer Motion'] },
  ];

  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {['all', 'ai', 'fs', 'tool'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-mono border ${filter === cat ? 'border-blue-400 text-blue-400 bg-blue-400/10' : 'border-white/10 text-gray-400 hover:border-blue-400/50'}`}
          >
            {cat === 'all' ? 'All' : cat === 'ai' ? 'AI / ML' : cat === 'fs' ? 'Full Stack' : 'Tools'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((proj, i) => (
          <div key={i} className="bg-[#1a2234] border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:border-blue-400/30 transition">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-sm">{proj.title}</h3>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${proj.cat === 'ai' ? 'border-purple-400/30 text-purple-400 bg-purple-400/5' : proj.cat === 'fs' ? 'border-blue-400/30 text-blue-400 bg-blue-400/5' : 'border-orange-400/30 text-orange-400 bg-orange-400/5'}`}>{proj.tag}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{proj.desc}</p>
            <div className="flex flex-wrap gap-1">
              {proj.stack.map(s => <span key={s} className="text-[10px] font-mono text-gray-500 bg-[#232f46] px-1.5 py-0.5 rounded">{s}</span>)}
            </div>
            <div className="flex gap-2 mt-1">
              <a href="#" className="text-xs font-mono text-blue-400 border border-blue-400/25 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-400/10">Live <ArrowUpRight size={11} /></a>
              <a href="#" className="text-xs font-mono text-blue-400 border border-blue-400/25 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-400/10">GitHub <ArrowUpRight size={11} /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsContent() {
  const groups = [
    { color: '#60A5FA', title: 'Frontend', skills: ['React', 'Next.js 15/16', 'TypeScript', 'Tailwind CSS', 'KaTeX', 'Framer Motion', 'TensorFlow.js', 'Canvas API'] },
    { color: '#34D399', title: 'Backend', skills: ['Node.js', 'Express', 'REST APIs', 'JWT Auth', 'Redis', 'BullMQ', 'WebSockets', 'Rate Limiting'] },
    { color: '#C4B5FD', title: 'AI & Data', skills: ['Gemini 2.5 Flash', 'OpenAI Embeddings', 'RAG Pipelines', 'pgvector', 'Cosine Similarity', 'Prompt Engineering', 'MoveNet'] },
    { color: '#FB923C', title: 'Databases', skills: ['Supabase', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis'] },
    { color: '#FBBF24', title: 'Tools & Infra', skills: ['Git & GitHub', 'Vercel', 'Render', 'Stripe', 'Razorpay', 'Typst', 'tsx', 'Python', 'Bash'] },
  ];
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">stack overview</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">What I Work With</h2>
      <p className="text-sm text-gray-400 mb-6">Backend-first, shipping products end-to-end solo.</p>
      {groups.map(g => (
        <div key={g.title} className="mb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
            <span style={{ color: g.color }}>{g.title}</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {g.skills.map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full text-xs font-mono border border-white/10 bg-[#1a2234] text-gray-300 hover:border-blue-400/30 hover:text-blue-400 transition cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceContent() {
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">work history</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">Experience</h2>
      <p className="text-sm text-gray-400 mb-6">Self-driven — building products with real users from Nagaland.</p>
      <div className="relative pl-7 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-blue-400 before:to-purple-600">
        <TimelineItem dotColor="bg-green-500" period="2024 — Present" title="Solo Founder & Full-Stack Developer" company="Edx Morung / MorungX · Nagaland" items={['Built Vizo AI — RAG-powered STEM tutoring', 'Shipped entire product solo: AI, Stripe, KaTeX', 'Founded Edx Morung: GST, Udyam, Razorpay', 'Built MorungX — student ecosystem', '6+ production products independently']} />
        <TimelineItem dotColor="bg-blue-500" period="2024" title="Hackathon Participant" company="Devpost · Remote" items={['Built Evalyze — AI answer-sheet grader', 'Gemini 2.5 Flash for rubric-based grading']} />
        <TimelineItem dotColor="bg-purple-500" period="2023 — 2024" title="Freelance Full-Stack Developer" company="Self-employed · Nagaland" items={['MERN & Next.js apps for local clients', 'Remote exam proctoring app with face-api.js', 'Established engineering patterns (lazy singleton, single-table DB)']} />
      </div>
    </div>
  );
}

function TimelineItem({ dotColor, period, title, company, items }: { dotColor: string; period: string; title: string; company: string; items: string[] }) {
  return (
    <div className="relative mb-7 last:mb-0">
      <div className={`absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#080C10] ${dotColor} shadow-[0_0_8px_rgba(0,0,0,0.3)]`} />
      <div className="text-[10px] font-mono text-gray-500 mb-1">{period}</div>
      <h3 className="text-sm font-semibold mb-0.5">{title}</h3>
      <div className="text-xs font-mono text-blue-400 mb-2">{company}</div>
      <ul className="space-y-0.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-gray-400 pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-gray-600">{it}</li>
        ))}
      </ul>
    </div>
  );
}

function EducationContent() {
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">academic background</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">Education</h2>
      <p className="text-sm text-gray-400 mb-6">Learn-by-building is the core philosophy.</p>
      <div className="space-y-3">
        <div className="bg-[#1a2234] border border-white/10 rounded-xl p-4 flex gap-3 hover:border-blue-400/25 transition">
          <div className="w-10 h-10 rounded-lg bg-orange-400/10 border border-orange-400/20 flex items-center justify-center"><GraduationCap className="text-orange-400" size={18} /></div>
          <div><h3 className="text-sm font-semibold">Computer Science & Engineering</h3><div className="text-xs font-mono text-blue-400">Currently Enrolled · Nagaland</div><p className="text-xs text-gray-500">Focus on software engineering, systems design, and AI integration</p></div>
        </div>
        <div className="bg-[#1a2234] border border-white/10 rounded-xl p-4 flex gap-3 hover:border-blue-400/25 transition">
          <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center"><FileText className="text-blue-400" size={18} /></div>
          <div><h3 className="text-sm font-semibold">NBSE Class XII</h3><div className="text-xs font-mono text-blue-400">Nagaland Board of School Education</div><p className="text-xs text-gray-500">Science stream — completed</p></div>
        </div>
        <div className="bg-[#1a2234] border border-purple-400/20 rounded-xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center"><Code className="text-purple-400" size={18} /></div>
          <div><h3 className="text-sm font-semibold">Self-Study Curriculum</h3><div className="text-xs font-mono text-blue-400">Structured Independent Learning</div><p className="text-xs text-gray-500">React Hooks · MongoDB · Full-stack auth patterns · TensorFlow.js · RAG & vector DBs · Production Node.js · DynamoDB single-table design</p></div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-400/5 border border-blue-400/15 rounded-lg text-xs text-gray-400 leading-relaxed">
        <strong className="text-gray-200">Philosophy:</strong> Every major skill was learned inside a real product — not a tutorial.
      </div>
    </div>
  );
}

function GalleryContent() {
  const items = [
    { icon: <Star size={40} className="opacity-40" />, cap: 'Vizo AI — dashboard', tilt: 2 },
    { icon: <Zap size={40} className="opacity-40" />, cap: 'Evalyze — grading', tilt: -1 },
    { icon: <MapPin size={40} className="opacity-40" />, cap: 'Nagaland 🇮🇳', tilt: 1.5 },
    { icon: <Code size={40} className="opacity-40" />, cap: 'PosturePet skeleton', tilt: -2 },
    { icon: <Briefcase size={40} className="opacity-40" />, cap: 'The workspace', tilt: 1 },
    { icon: <Folder size={40} className="opacity-40" />, cap: 'MorungX dashboard', tilt: -1.5 },
  ];
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">build log</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">The Workshop</h2>
      <p className="text-sm text-gray-400 mb-6">Screenshots from products I've built.</p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-[#1a2234] border border-white/10 rounded-lg p-2 pb-6 shadow-lg hover:rotate-[var(--tilt)] hover:scale-105 transition" style={{ '--tilt': `${item.tilt}deg` } as React.CSSProperties}>
            <div className="aspect-square rounded bg-[#232f46] flex items-center justify-center">{item.icon}</div>
            <p className="text-[10px] font-mono text-gray-500 text-center mt-2">{item.cap}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsContent() {
  const wins = [
    { icon: <Trophy size={18} className="text-yellow-400" />, title: 'Launched Vizo AI — Solo', desc: 'Full AI tutoring platform built and shipped end-to-end.' },
    { icon: <Trophy size={18} className="text-yellow-400" />, title: 'Devpost Hackathon', desc: 'Built Evalyze under time constraints, live in production.' },
    { icon: <Briefcase size={18} className="text-yellow-400" />, title: 'Registered Sole Proprietorship', desc: 'GST, Udyam, Razorpay Route, and banking — independently.' },
    { icon: <Zap size={18} className="text-yellow-400" />, title: '6+ Production Products', desc: 'All shipped and deployed solo.' },
  ];
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">milestones</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">Achievements</h2>
      <p className="text-sm text-gray-400 mb-6">Shipped, registered, and built from Northeast India.</p>
      <div className="space-y-3">
        {wins.map((w, i) => (
          <div key={i} className="bg-[#1a2234] border border-white/10 rounded-xl p-4 flex gap-3 hover:border-yellow-400/20 transition">
            <div className="w-9 h-9 rounded-lg bg-yellow-400/10 border border-yellow-400/15 flex items-center justify-center shrink-0">{w.icon}</div>
            <div><h3 className="text-sm font-semibold">{w.title}</h3><p className="text-xs text-gray-400">{w.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">get in touch</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">Let's Connect</h2>
      <div className="bg-blue-400/5 border border-blue-400/20 rounded-xl p-5 mb-4">
        <h3 className="text-lg font-bold">Noba</h3>
        <div className="text-xs font-mono text-blue-400 mb-2">// Solo Developer & Founder · Edx Morung · Nagaland, India 🇮🇳</div>
        <p className="text-sm text-gray-400">Full-stack developer building AI-powered edtech and community tools. Open to frontend and full-stack internship opportunities — remote-friendly.</p>
      </div>
      <div className="space-y-2">
        <a href="mailto:hello@noba.dev" className="flex items-center gap-3 p-3 rounded-lg bg-[#1a2234] border border-white/10 hover:border-blue-400/30 text-gray-300 text-sm">
          <Mail size={16} className="text-blue-400" /> hello@noba.dev
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[#1a2234] border border-white/10 hover:border-blue-400/30 text-gray-300 text-sm">
          <Code size={16} className="text-purple-400" /> github.com/noba
        </a>
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <div>
      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">curriculum vitae</div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">Resume</h2>
      <p className="text-sm text-gray-400 mb-6">Available in Frontend and Full-Stack variants. Crafted in Typst.</p>
      <div className="bg-[#1a2234] border border-white/10 rounded-xl p-4 font-mono text-xs leading-relaxed mb-4 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:to-purple-500">
        <span className="text-gray-500">// noba — developer resume</span><br/>
        <span className="text-blue-400">name</span>         <span className="text-green-400">Noba</span><br/>
        <span className="text-blue-400">location</span>     <span className="text-orange-400">"Nagaland, India 🇮🇳"</span><br/>
        <span className="text-blue-400">focus</span>        <span className="text-orange-400">"Full-Stack · AI/ML · Edtech"</span><br/>
        <span className="text-blue-400">open_to</span>     <span className="text-orange-400">"Frontend & Full-Stack Internships"</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-gray-900 rounded-lg font-semibold text-sm">Download Frontend</button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 text-gray-300 rounded-lg font-semibold text-sm">Download Full-Stack</button>
      </div>
    </div>
  );
}

// ---------- Main Page Component ----------
export default function DesktopPage() {
  const [boot, setBoot] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zCounter, setZCounter] = useState(200);
  const cascadeRef = useRef({ x: 0, y: 0 });
  const [clock, setClock] = useState('');
  const [dockDate, setDockDate] = useState('');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const wallpapers = [
    'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(79,158,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(167,139,250,0.1) 0%, transparent 55%), linear-gradient(160deg, #080C10 0%, #0B1120 40%, #090D15 100%)',
    'radial-gradient(ellipse 70% 50% at 30% 70%, rgba(251,146,60,0.1) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 70% 30%, rgba(61,220,132,0.08) 0%, transparent 50%), linear-gradient(150deg, #0a0f1a 0%, #0d1525 50%, #080c14 100%)',
    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(167,139,250,0.1) 0%, transparent 50%), radial-gradient(ellipse 80% 40% at 20% 80%, rgba(79,158,255,0.08) 0%, transparent 50%), linear-gradient(170deg, #090d16 0%, #0e1320 40%, #060a12 100%)',
  ];

  // Boot timer
  useEffect(() => {
    const timer = setTimeout(() => setBoot(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Clock
  useEffect(() => {
    const update = () => {
      const n = new Date();
      const h = n.getHours(), m = n.getMinutes();
      const ap = h >= 12 ? 'PM' : 'AM', hh = h % 12 || 12, mm = String(m).padStart(2, '0');
      setClock(`${n.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}  ${hh}:${mm} ${ap}`);
      setDockDate(n.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // XP & Achievements
  const [xp, setXp] = useState(0);
  const [unlockedAchievements, setUnlocked] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<{ id: number; msg: string; desc: string; emoji: string; xp: number }[]>([]);

  useEffect(() => {
    const savedXp = parseInt(localStorage.getItem('noba_xp') || '0');
    const savedAch = JSON.parse(localStorage.getItem('noba_achievements') || '[]');
    setXp(savedXp);
    setUnlocked(new Set(savedAch));
  }, []);

  const addXp = useCallback((amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      localStorage.setItem('noba_xp', newXp.toString());
      return newXp;
    });
  }, []);

  const unlockAchievement = useCallback((ach: Achievement, xpReward: number) => {
    setUnlocked(prev => {
      if (prev.has(ach.id)) return prev;
      const next = new Set(prev);
      next.add(ach.id);
      localStorage.setItem('noba_achievements', JSON.stringify([...next]));
      addXp(xpReward);
      setToasts(t => [...t, { id: Date.now(), msg: ach.title, desc: ach.desc, emoji: ach.emoji, xp: xpReward }]);
      setTimeout(() => {
        setToasts(current => current.filter(t => t.id !== Date.now()));
      }, 3000);
      return next;
    });
  }, [addXp]);

  const getLevel = () => {
    const levels = [
      { name: 'Apprentice', min: 0 },
      { name: 'Explorer', min: 100 },
      { name: 'Builder', min: 250 },
      { name: 'Architect', min: 500 },
      { name: 'Senior Dev', min: 1000 },
      { name: 'Tech Lead', min: 2000 },
      { name: 'CTO', min: 4000 },
    ];
    let lvl = levels[0];
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i].min) { lvl = levels[i]; break; }
    }
    const idx = levels.indexOf(lvl) + 1;
    return { name: lvl.name, level: idx };
  };

  const openWindow = (key: string) => {
    const section = sections[key as keyof typeof sections];
    if (!section) return;
    const existing = windows.find(w => w.key === key && !w.minimized);
    if (existing) {
      setActiveWindowId(existing.id);
      return;
    }
    const desktopW = window.innerWidth;
    const desktopH = window.innerHeight - 72;
    const w = Math.min(800, desktopW - 80);
    const h = Math.min(600, desktopH - 80);
    let cx = cascadeRef.current.x;
    let cy = cascadeRef.current.y;
    if (cx + w > desktopW - 20) cx = 20;
    if (cy + h > desktopH - 20) cy = 20;
    cascadeRef.current = { x: cx + 35, y: cy + 35 };
    if (cascadeRef.current.x > 180 || cascadeRef.current.y > 160) cascadeRef.current = { x: 0, y: 0 };

    const newZ = zCounter + 1;
    setZCounter(newZ);
    const id = `win-${Date.now()}`;
    const newWin: WindowState = {
      id,
      key,
      title: section.title,
      crumb: section.crumb,
      icon: section.icon,
      content: section.content,
      position: { x: cx, y: cy },
      size: { w, h },
      minimized: false,
      maximized: false,
      zIndex: newZ,
    };
    setWindows(prev => [...prev, newWin]);
    setActiveWindowId(id);
    addXp(30);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true, maximized: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      if (w.maximized) {
        return { ...w, maximized: false, size: w.prevSize?.w ? { w: w.prevSize.w, h: w.prevSize.h } : w.size, position: w.prevSize?.x ? { x: w.prevSize.x, y: w.prevSize.y } : w.position, prevSize: undefined };
      } else {
        return { ...w, maximized: true, prevSize: { w: w.size.w, h: w.size.h, x: w.position.x, y: w.position.y }, size: { w: window.innerWidth, h: window.innerHeight - 72 }, position: { x: 0, y: 0 } };
      }
    }));
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setZCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zCounter + 1 } : w));
  };

  // Context menu
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Konami code
  const konamiRef = useRef<string[]>([]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key);
      konamiRef.current = konamiRef.current.slice(-10);
      if (konamiRef.current.join(',') === 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA') {
        unlockAchievement({ id: 'konami', title: 'Konami Code!', desc: 'Secret easter egg 🕹️', emoji: '🕹️' }, 150);
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => { document.body.style.filter = ''; }, 600);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [unlockAchievement]);

  const level = getLevel();

  return (
    <div className="h-screen w-screen relative overflow-hidden font-sans">
      {/* Boot screen */}
      {boot && (
        <div className="fixed inset-0 z-[9999] bg-[#080C10] flex flex-col items-center justify-center gap-5 transition-opacity duration-500" style={{ opacity: boot ? 1 : 0 }}>
          <div className="text-3xl font-bold font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">noba.dev</div>
          <div className="text-xs font-mono text-gray-500 tracking-widest">INITIALIZING WORKSPACE</div>
          <div className="w-40 h-px bg-gray-800 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-[boot_1.4s_ease-out_forwards]" />
          </div>
        </div>
      )}

      {/* Wallpaper */}
      <div className="fixed inset-0 z-0" style={{ background: wallpapers[wallpaperIndex] }} />
      <div className="fixed inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Menubar */}
      <div className="fixed top-0 left-0 right-0 z-[2000] h-9 bg-[#0D1117]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-[13px] font-semibold">
            <Zap size={14} /> noba.dev
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs font-mono text-gray-400">Edx Morung</span>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs font-mono text-gray-400">Nagaland, India</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> Lvl {level.level} · {xp} XP
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Open to Internships
          </div>
          <span className="text-xs font-mono text-gray-400">{clock}</span>
        </div>
      </div>

      {/* Desktop icons */}
      <div className="fixed top-9 left-0 right-0 bottom-9 flex flex-col items-center justify-center p-6 z-10">
        <div className="text-center mb-10 pointer-events-none">
          <div className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-2">Welcome to my workspace</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">Noba</h1>
          <p className="text-sm font-mono text-gray-400 mt-1">Full-Stack Developer · AI Builder · <span className="text-blue-400">Solo Founder</span></p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {Object.entries(sections).map(([key, sec]) => (
            <div key={key} className="flex flex-col items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-white/5 transition" onClick={() => openWindow(key)}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br shadow-lg flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl" />
                {sec.icon}
              </div>
              <span className="text-[10px] text-gray-300 font-medium text-center">{sec.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-[2000] h-9 bg-[#0D1117]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-center gap-5 px-5 text-xs font-mono text-gray-500">
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-300" onClick={() => openWindow('projects')}><Folder size={12} className="text-blue-400" /> Projects</div>
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-300" onClick={() => openWindow('skills')}><Code size={12} className="text-green-400" /> Skills</div>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-300" onClick={() => openWindow('experience')}><Briefcase size={12} className="text-purple-400" /> Experience</div>
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-300" onClick={() => openWindow('contact')}><Mail size={12} className="text-emerald-400" /> Contact</div>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-1.5"><MapPin size={12} className="text-gray-500" /> Nagaland 🇮🇳</div>
        <span>{dockDate}</span>
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          win={win}
          active={win.id === activeWindowId}
          onFocus={() => focusWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onDrag={(x, y) => {
            setWindows(prev => prev.map(w => w.id === win.id ? { ...w, position: { x, y } } : w));
          }}
        />
      ))}

      {/* Context menu */}
      {contextMenu && (
        <div className="fixed z-[3000] bg-[#16202e]/95 backdrop-blur-md border border-white/10 rounded-lg py-1 shadow-2xl min-w-[180px] text-xs text-gray-300" style={{ left: contextMenu.x, top: contextMenu.y }}>
          <div className="px-4 py-2 hover:bg-blue-400/10 cursor-pointer flex items-center gap-2" onClick={() => { setWallpaperIndex((wallpaperIndex + 1) % wallpapers.length); setContextMenu(null); }}><Image size={14} /> Change Wallpaper</div>
          <div className="px-4 py-2 hover:bg-blue-400/10 cursor-pointer flex items-center gap-2" onClick={() => { /* show achievements */ setContextMenu(null); }}><Trophy size={14} /> Achievements</div>
        </div>
      )}
      <div className="absolute inset-0 z-0" onContextMenu={e => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }} />

      {/* Toast container */}
      <div className="fixed top-12 right-4 z-[4000] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto bg-[#16202e]/95 border border-white/10 rounded-xl p-3 flex items-center gap-3 shadow-xl backdrop-blur-md animate-in slide-in-from-right">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-lg">{t.emoji}</div>
            <div>
              <div className="text-xs font-semibold">{t.msg}</div>
              <div className="text-[10px] text-gray-500">{t.desc}</div>
            </div>
            <span className="text-[11px] font-mono text-yellow-400 font-semibold ml-auto">+{t.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Window component ----------
function Window({ win, active, onFocus, onClose, onMinimize, onMaximize, onDrag }: {
  win: WindowState;
  active: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDrag: (x: number, y: number) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const winRef = useRef<HTMLDivElement>(null);

  if (win.minimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.traffic-lights')) return;
    if (win.maximized) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, left: win.position.x, top: win.position.y };
    e.preventDefault();
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      onDrag(dragStart.current.left + dx, dragStart.current.top + dy);
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging, onDrag]);

  return (
    <div
      ref={winRef}
      className={`absolute flex flex-col bg-[#111827]/95 backdrop-blur-xl border ${active ? 'border-blue-400/25 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.8),0_0_120px_rgba(79,158,255,0.08)]' : 'border-white/10 shadow-xl'} rounded-xl overflow-hidden transition-shadow`}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.w,
        height: win.size.h,
        zIndex: win.zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-0 px-3 h-10 bg-white/[0.03] border-b border-white/10 cursor-grab select-none" onMouseDown={handleMouseDown}>
        <div className="flex gap-2 mr-2 traffic-lights">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110 flex items-center justify-center"><X size={8} className="text-black/50" /></button>
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110 flex items-center justify-center"><Minus size={8} className="text-black/50" /></button>
          <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110 flex items-center justify-center"><Square size={8} className="text-black/50" /></button>
        </div>
        <span className="text-xs font-mono text-gray-400">{win.title}</span>
        <span className="ml-auto text-[10px] font-mono text-gray-600">{win.crumb}</span>
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 text-sm">
        {win.content}
      </div>
    </div>
  );
}