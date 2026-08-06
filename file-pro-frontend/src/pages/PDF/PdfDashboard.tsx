import {
  Merge,
  FileOutput,
  Minimize2,
  Image,
  ArrowLeft,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

const mono = { fontFamily: "'IBM Plex Mono', monospace" };
const sans = { fontFamily: "'IBM Plex Sans', sans-serif" };

const PAPER = "#0D1117";
const INK = "#F0F6FC";
const BLUE = "#38BDF8";
const STAMP = "#FF6B4A";
const LINE = "#21262D";
const CARD_BG = "#161B22";

const gridBg = {
  backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
};

const PdfDashboard = () => {
  const tools = [
    {
      to: "/pdf/merge",
      code: "MRG",
      title: "Merge PDFs",
      description: "Combine multiple PDF files into one continuous stream.",
      icon: <Merge size={24} style={{ color: BLUE }} />,
    },
    {
      to: "/pdf/split",
      code: "SPL",
      title: "Split PDF",
      description: "Extract designated page blocks into separate output files.",
      icon: <FileOutput size={24} style={{ color: BLUE }} />,
    },
    {
      to: "/pdf/compress",
      code: "CMP",
      title: "Compress PDF",
      description: "Optimize PDF filesize while preserving visual fidelity.",
      icon: <Minimize2 size={24} style={{ color: BLUE }} />,
    },
    {
      to: "/pdf/create",
      code: "GEN",
      title: "Images to PDF",
      description: "Convert bitmap image streams into standard PDF documents.",
      icon: <Image size={24} style={{ color: BLUE }} />,
    },
  ];

  return (
    <main
      style={{ ...sans, background: PAPER, color: INK }}
      className="relative min-h-screen"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="pointer-events-none absolute inset-0" style={gridBg} />

      <section className="relative mx-auto max-w-7xl px-6 py-14">
        <Link
          to="/dashboard"
          style={mono}
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky-400 hover:underline"
        >
          <ArrowLeft size={16} />
          Return to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Terminal size={20} style={{ color: STAMP }} />
          <span style={mono} className="text-xs uppercase tracking-[0.2em]">
            System Workspace // Pipeline ID #04
          </span>
        </div>

        <h1 style={mono} className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
          PDF Pipeline Tools
        </h1>

        <p className="mt-3 text-base" style={{ color: `${INK}b3` }}>
          Execute high-performance document operations and transformations.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tools.map((item) => (
            <Link
              key={item.code}
              to={item.to}
              className="group relative border-2 p-8 transition-all hover:-translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
              style={{ background: CARD_BG, borderColor: LINE }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center border"
                  style={{ borderColor: LINE }}
                >
                  {item.icon}
                </div>
                <span style={mono} className="text-xs">
                  <span style={{ color: `${INK}66` }}>[</span>
                  <span style={{ color: STAMP }}>{item.code}</span>
                  <span style={{ color: `${INK}66` }}>]</span>
                </span>
              </div>

              <h2 style={mono} className="mt-6 text-xl font-bold group-hover:text-sky-400">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${INK}80` }}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        <div
          className="mt-16 border-2 p-8 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
          style={{ background: CARD_BG, borderColor: LINE }}
        >
          <div className="flex items-center gap-2" style={mono}>
            <span style={{ color: STAMP }}>&gt;</span>
            <h2 className="text-lg font-bold">TOOLKIT_INFO</h2>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: `${INK}80` }}>
            Execute binary PDF file manipulation in secure localized memory. Batch process document streams, 
            split page indices, execute lossless compressions, and compile media assets directly through File-Pro pipelines.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PdfDashboard;