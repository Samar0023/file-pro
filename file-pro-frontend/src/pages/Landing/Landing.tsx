import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Image,
  Share2,
  Shield,
  Zap,
  Terminal,
  CheckCircle2,
  Menu,
  LayoutDashboard,
} from "lucide-react";

const mono = { fontFamily: "'IBM Plex Mono', monospace" };
const sans = { fontFamily: "'IBM Plex Sans', sans-serif" };

const PAPER = "#0D1117";
const INK = "#F0F6FC";       
const BLUE = "#38BDF8";       
const TRACE = "#34D399";      
const STAMP = "#FF6B4A";      
const LINE = "#21262D";       
const CARD_BG = "#161B22";  

const modules = [
  { code: "UP", title: "Upload Files", description: "Fast, resumable uploads for every document type.", icon: <FileText size={20} /> },
  { code: "IMG", title: "Image Tools", description: "Resize, crop and optimize — powered by Sharp.", icon: <Image size={20} /> },
  { code: "SHR", title: "Secure Sharing", description: "Generate protected links in a single click.", icon: <Share2 size={20} /> },
  { code: "PRF", title: "Lightning Fast", description: "Sub-second processing at any file size.", icon: <Zap size={20} /> },
  { code: "SEC", title: "Enterprise Security", description: "JWT authentication, encrypted at rest.", icon: <Shield size={20} /> },
  { code: "API", title: "Developer API", description: "Full REST access — script your entire pipeline.", icon: <Terminal size={20} /> },
];

const stages = [
  { n: "01", title: "Upload", body: "Drag any document, PDF or image into your workspace." },
  { n: "02", title: "Process", body: "Merge PDFs, optimize images, run transforms in seconds." },
  { n: "03", title: "Ship", body: "Download the result or generate a secure share link." },
];

const gridBg = {
  backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
};

const Landing = () => {
  
  const isLoggedIn = true;

  return (
    <main style={{ ...sans, background: PAPER, color: INK }} className="min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

    
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: LINE, background: `${PAPER}e6`, backdropFilter: "blur(8px)" }}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" style={mono} className="flex items-baseline gap-2 text-2xl font-bold tracking-tight">
            <span>FILE</span>
            <span style={{ color: STAMP }}>—</span>
            <span style={{ color: BLUE }}>PRO</span>
          </Link>

          <nav style={mono} className="hidden items-center gap-10 text-xs uppercase tracking-[0.15em] lg:flex">
            {["Features", "Workflow", "Pricing", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="opacity-70 transition hover:opacity-100">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                style={{ ...mono, background: BLUE, color: PAPER }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ ...mono, borderColor: LINE }}
                  className="rounded-none border px-5 py-2.5 text-sm transition hover:bg-white/5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{ ...mono, background: INK, color: PAPER }}
                  className="rounded-none px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden" aria-label="Menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

    
      <section className="relative overflow-hidden border-b" style={{ borderColor: LINE }}>
        <div className="pointer-events-none absolute inset-0" style={gridBg} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <div style={{ ...mono, borderColor: LINE }} className="mb-8 inline-flex items-center gap-2 border px-3 py-1.5 text-xs uppercase tracking-[0.2em]">
              <span style={{ color: STAMP }}>●</span>
              Spec Sheet No. 004 — File Processing System
            </div>

            <h1 style={mono} className="text-5xl font-bold leading-[1.08] tracking-tight lg:text-6xl">
              Upload it.
              <br />
              Process it.
              <br />
              <span style={{ color: BLUE }}>Ship it.</span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8" style={{ color: `${INK}b3` }}>
              Upload files, merge PDFs, resize images and share everything
              securely — from one workspace built for developers.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  style={{ ...mono, background: BLUE, color: PAPER }}
                  className="flex items-center gap-2 px-7 py-4 text-sm font-semibold transition hover:opacity-90"
                >
                  <LayoutDashboard size={18} />
                  Go to Dashboard
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    style={{ ...mono, background: INK, color: PAPER }}
                    className="flex items-center gap-2 px-7 py-4 text-sm font-medium transition hover:opacity-90"
                  >
                    Start Free
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/login"
                    style={{ ...mono, borderColor: LINE }}
                    className="border px-7 py-4 text-sm transition hover:bg-white/5"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            <div style={mono} className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.1em]">
              {["≤ 250MB / file", "JWT auth", "Sharp-powered", "REST API"].map((s) => (
                <span key={s} style={{ color: `${INK}80` }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div
              className="relative border-2 p-7 shadow-[6px_6px_0_0_rgba(0,0,0,0.6)]"
              style={{ background: CARD_BG, borderColor: LINE }}
            >
              <div className="absolute -left-3 top-0 flex h-full flex-col justify-around" aria-hidden>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="h-2 w-2 rounded-full" style={{ background: PAPER, border: `2px solid ${LINE}` }} />
                ))}
              </div>

              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: LINE }}>
                <p style={mono} className="text-xs uppercase tracking-[0.15em]">Manifest #A19-04</p>
                <p style={mono} className="text-xs">{new Date().toISOString().slice(0, 10)}</p>
              </div>

              <ul className="mt-5 space-y-4">
                {[
                  { label: "invoice.pdf", op: "UPLOAD", done: true },
                  { label: "design.png", op: "RESIZE 2048px", done: true },
                  { label: "contract.pdf", op: "SHARE LINK", done: true },
                  { label: "bundle.zip", op: "COMPRESS", done: false },
                ].map((row) => (
                  <li key={row.label} className="flex items-center justify-between text-sm">
                    <div>
                      <p style={mono} className="font-medium">{row.label}</p>
                      <p style={mono} className="text-[11px] uppercase tracking-[0.1em]">
                        <span style={{ color: row.done ? TRACE : STAMP }}>{row.op}</span>
                      </p>
                    </div>
                    {row.done ? (
                      <CheckCircle2 size={18} style={{ color: BLUE }} />
                    ) : (
                      <span style={mono} className="text-[11px]">···</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-2 w-full overflow-hidden" style={{ background: `${LINE}` }}>
                <div className="h-full w-3/4" style={{ background: BLUE }} />
              </div>
            </div>

            <div
              className="absolute -right-6 -top-6 flex h-24 w-24 rotate-[-14deg] items-center justify-center rounded-full border-[3px] text-center"
              style={{ borderColor: STAMP, color: STAMP, background: PAPER }}
            >
              <span style={mono} className="text-[10px] font-bold uppercase leading-tight tracking-[0.1em]">
                Processed
                <br />
                OK
              </span>
            </div>
          </div>
        </div>
      </section>

     
      <section id="features" className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p style={mono} className="text-xs uppercase tracking-[0.25em]">
              <span style={{ color: BLUE }}>§ 01</span> — Module Index
            </p>
            <h2 style={mono} className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Everything in one place.
            </h2>
            <p className="mt-6 text-lg leading-8" style={{ color: `${INK}b3` }}>
              Six modules, one pipeline. Compose them however your workflow needs.
            </p>
          </div>

          <div className="mt-16 grid gap-px border" style={{ background: LINE, borderColor: LINE }}>
            <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-3" style={{ background: LINE }}>
              {modules.map((m) => (
                <div key={m.code} className="p-8 transition hover:-translate-y-0.5" style={{ background: CARD_BG }}>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border" style={{ borderColor: LINE, color: BLUE }}>
                      {m.icon}
                    </div>
                    <span style={mono} className="text-xs">
                      <span style={{ color: `${INK}66` }}>[</span>
                      <span style={{ color: STAMP }}>{m.code}</span>
                      <span style={{ color: `${INK}66` }}>]</span>
                    </span>
                  </div>
                  <h3 style={mono} className="mt-6 text-xl font-semibold">{m.title}</h3>
                  <p className="mt-3 leading-7" style={{ color: `${INK}80` }}>{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section id="workflow" className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p style={mono} className="text-xs uppercase tracking-[0.25em]">
            <span style={{ color: BLUE }}>§ 02</span> — Process Pipeline
          </p>
          <h2 style={mono} className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
            Three stages. One pipeline.
          </h2>

          <div className="relative mt-20 grid gap-12 lg:grid-cols-3">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px lg:block"
              style={{ background: `repeating-linear-gradient(90deg, ${INK}33 0 10px, transparent 10px 20px)` }}
            />
            {stages.map((s) => (
              <div key={s.n} className="relative">
                <span style={{ ...mono, background: PAPER, color: BLUE }} className="relative z-10 inline-block pr-4 text-5xl font-bold">
                  {s.n}
                </span>
                <h3 style={mono} className="mt-6 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-4 leading-7" style={{ color: `${INK}80` }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="border-2 border-dashed p-12 text-center md:p-20" style={{ borderColor: LINE }}>
            <p style={{ ...mono, color: `${INK}66` }} className="text-xs uppercase tracking-[0.25em]">
              To: Your Workflow — From: File-Pro
            </p>
            <h2 style={mono} className="mt-6 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              Ready to simplify
              <br />
              your file pipeline?
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8" style={{ color: `${INK}b3` }}>
              Start using File-Pro today and manage every file from one workspace.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  style={{ ...mono, background: BLUE, color: PAPER }}
                  className="px-8 py-4 text-sm font-semibold transition hover:opacity-90 flex items-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    style={{ ...mono, background: INK, color: PAPER }}
                    className="px-8 py-4 text-sm font-medium transition hover:opacity-90"
                  >
                    Create Account
                  </Link>
                  <Link to="/login" style={{ ...mono, borderColor: LINE }} className="border px-8 py-4 text-sm transition hover:bg-white/5">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

   
      <footer id="contact">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-xs md:flex-row" style={mono}>
          <div style={{ color: `${INK}80` }}>FILE-PRO™ · BUILD 2026.08 · ALL SYSTEMS NOMINAL</div>
          <div className="flex items-center gap-8" style={{ color: `${INK}80` }}>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;