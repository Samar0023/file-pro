import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  description: string;
  originalname: string;
  mimeType: string;
}

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

const SplitPdf = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getFiles = async () => {
    try {
      const res = await api.get("/files/allfiles");

      const pdfs = res.data.files.filter(
        (file: FileData) => file.mimeType === "application/pdf"
      );

      setFiles(pdfs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const splitPdf = async () => {
    if (!selected) {
      setError("Select a PDF.");
      return;
    }

    try {
      setProcessing(true);
      setError("");
      setMessage("");

      const res = await api.post(`/pdf/split-pdf/${selected}`);

      setMessage(res.data.message);
      getFiles();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Split failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <main
        style={{ ...mono, background: PAPER, color: INK }}
        className="flex min-h-screen items-center justify-center text-sm"
      >
        LOADING_PIPELINE...
      </main>
    );
  }

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

      <section className="relative mx-auto max-w-5xl px-6 py-14">
        <Link
          to="/pdf"
          style={mono}
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky-400 hover:underline"
        >
          <ArrowLeft size={16} />
          Return to PDF Tools
        </Link>

        <div className="flex items-center gap-3">
          <Terminal size={20} style={{ color: STAMP }} />
          <span style={mono} className="text-xs uppercase tracking-[0.2em]">
            System Workspace // Extraction ID #04
          </span>
        </div>

        <h1 style={mono} className="mt-4 text-4xl font-bold tracking-tight">
          Split PDF Stream
        </h1>

        <p className="mt-3 text-base" style={{ color: `${INK}b3` }}>
          Select a single binary PDF target to extract into separate streams.
        </p>

        <div className="mt-10 space-y-5">
          {files.length === 0 ? (
            <div
              className="border-2 border-dashed p-14 text-center"
              style={{ background: CARD_BG, borderColor: LINE }}
            >
              <FileText size={50} className="mx-auto" style={{ color: STAMP }} />

              <h2 style={mono} className="mt-6 text-xl font-bold">
                NO_PDF_STREAMS_FOUND
              </h2>

              <p style={mono} className="mt-2 text-xs text-slate-400">
                No target PDF objects detected in system storage.
              </p>

              <Link
                to="/upload"
                style={{ ...mono, borderColor: LINE }}
                className="mt-6 inline-block border bg-sky-500/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20"
              >
                Upload PDF Stream
              </Link>
            </div>
          ) : (
            files.map((file) => (
              <label
                key={file.id}
                className="flex cursor-pointer items-start gap-5 border-2 p-6 transition-all hover:-translate-y-0.5 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
                style={{ background: CARD_BG, borderColor: LINE }}
              >
                <input
                  type="radio"
                  name="pdf"
                  checked={selected === file.id}
                  onChange={() => setSelected(file.id)}
                  className="mt-1.5 h-4 w-4 accent-sky-400"
                />

                <div
                  className="flex h-10 w-10 items-center justify-center border"
                  style={{ borderColor: LINE }}
                >
                  <FileText size={20} style={{ color: BLUE }} />
                </div>

                <div className="flex-1">
                  <h2 style={mono} className="text-base font-bold text-sky-400">
                    {file.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">{file.description}</p>

                  <p style={mono} className="mt-3 text-xs text-slate-500">
                    SRC: {file.originalname}
                  </p>
                </div>
              </label>
            ))
          )}

          {error && (
            <div
              style={mono}
              className="border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-400"
            >
              [ERROR] {error}
            </div>
          )}

          {message && (
            <div
              style={mono}
              className="border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-400"
            >
              [SUCCESS] {message}
            </div>
          )}

          <button
            onClick={splitPdf}
            disabled={processing}
            style={{ ...mono, borderColor: LINE }}
            className="w-full border bg-sky-500/10 py-4 text-sm font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? "SPLITTING_PIPELINE..." : "EXECUTE_SPLIT"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default SplitPdf;