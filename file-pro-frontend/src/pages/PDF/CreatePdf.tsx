import { useRef, useState } from "react";
import { UploadCloud, FileText, ArrowLeft, Terminal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

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

const Upload = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const chooseFile = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files.length) return;
    setFile(e.dataTransfer.files[0]);
    setError("");
    setSuccess("");
  };

  const upload = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!file) {
      setError("Choose a file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          if (!e.total) return;
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setSuccess("File uploaded successfully.");

      setTimeout(() => {
        navigate("/files");
      }, 1000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

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

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: LINE,
          background: `${PAPER}e6`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            to="/dashboard"
            style={mono}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-sky-400 hover:underline"
          >
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>

          <h1 style={mono} className="text-xl font-bold tracking-tight">
            FILE_INGESTION
          </h1>

          <div />
        </div>
      </header>

      <section className="relative mx-auto max-w-3xl px-6 py-14">
        <div className="flex items-center gap-3">
          <Terminal size={20} style={{ color: STAMP }} />
          <span style={mono} className="text-xs uppercase tracking-[0.2em]">
            System Workspace // Ingest ID #02
          </span>
        </div>

        <h1 style={mono} className="mt-4 text-4xl font-bold tracking-tight">
          Upload File
        </h1>

        <p className="mt-3 text-base" style={{ color: `${INK}b3` }}>
          Stream local document assets into secure system repository.
        </p>

        <div
          className="mt-10 space-y-6 border-2 p-8 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
          style={{ background: CARD_BG, borderColor: LINE }}
        >
          <div>
            <label
              style={mono}
              className="mb-2 block text-xs uppercase tracking-wider text-slate-400"
            >
              Document Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. System Architecture Docs"
              style={{ ...mono, background: PAPER, borderColor: LINE, color: INK }}
              className="w-full border p-3 text-sm outline-none transition focus:border-sky-400"
            />
          </div>

          <div>
            <label
              style={mono}
              className="mb-2 block text-xs uppercase tracking-wider text-slate-400"
            >
              Description / Metadata
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context or instructions for this file..."
              style={{ ...mono, background: PAPER, borderColor: LINE, color: INK }}
              className="w-full border p-3 text-sm outline-none transition focus:border-sky-400"
            />
          </div>

          <div
            onClick={chooseFile}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{ background: PAPER, borderColor: LINE }}
            className="cursor-pointer border-2 border-dashed p-10 text-center transition hover:border-sky-400"
          >
            <UploadCloud size={50} className="mx-auto" style={{ color: BLUE }} />
            <h2 style={mono} className="mt-4 text-lg font-bold">
              Drag & Drop file payload
            </h2>
            <p style={mono} className="mt-1 text-xs text-slate-400">
              or click to browse local file system
            </p>
            <input
              hidden
              ref={inputRef}
              type="file"
              onChange={handleChange}
            />
          </div>

          {file && (
            <div
              className="border p-4"
              style={{ background: PAPER, borderColor: LINE }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center border"
                  style={{ borderColor: LINE }}
                >
                  <FileText size={20} style={{ color: BLUE }} />
                </div>
                <div className="flex-1">
                  <h3 style={mono} className="text-sm font-semibold break-all">
                    {file.name}
                  </h3>
                  <p style={mono} className="mt-1 text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {progress > 0 && (
            <div style={mono}>
              <div className="mb-2 flex justify-between text-xs">
                <span>UPLOADING_STREAM...</span>
                <span>{progress}%</span>
              </div>
              <div
                className="h-2 w-full overflow-hidden border"
                style={{ background: PAPER, borderColor: LINE }}
              >
                <div
                  style={{ width: `${progress}%`, background: BLUE }}
                  className="h-full transition-all duration-300"
                />
              </div>
            </div>
          )}

          {error && (
            <div
              style={mono}
              className="border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-400"
            >
              [ERROR] {error}
            </div>
          )}

          {success && (
            <div
              style={mono}
              className="border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-400"
            >
              [SUCCESS] {success}
            </div>
          )}

          <button
            onClick={upload}
            disabled={loading}
            style={{ ...mono, borderColor: LINE }}
            className="w-full border bg-sky-500/10 py-4 text-sm font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "TRANSMITTING..." : "EXECUTE_UPLOAD"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Upload;