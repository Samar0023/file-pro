import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileImage, Check, Loader2, ArrowLeft, Terminal } from "lucide-react";
import api from "../../api/axios";

interface FileItem {
  id: string;
  title: string;
  fileUrl: string;
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

export default function CreatePdf() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [createdFile, setCreatedFile] = useState<FileItem | null>(null);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    try {
      const res = await api.get("/files/allfiles");

      const images = res.data.files.filter((file: FileItem) =>
        file.mimeType.startsWith("image/")
      );

      setFiles(images);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  }

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  async function createPdf() {
    if (!selected.length) {
      setError("Select at least one image.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await api.post("/pdf/create-pdf", {
        fileIds: selected,
      });

      if (res.data.success && res.data.data) {
        setCreatedFile(res.data.data);
        setMessage("PDF created successfully!");
        setSelected([]);

        // Redirect to file details page after showing success message
        setTimeout(() => {
          navigate(`/files/${res.data.data.id}`);
        }, 1500);
      } else {
        setMessage("PDF created successfully!");
        setSelected([]);
        setTimeout(() => {
          navigate("/files");
        }, 1500);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create PDF");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
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
            System Workspace // PDF Generation ID #04
          </span>
        </div>

        <h1 style={mono} className="mt-4 text-4xl font-bold tracking-tight">
          Create PDF from Images
        </h1>

        <p className="mt-3 text-base" style={{ color: `${INK}b3` }}>
          Select image assets to compile into a single PDF document.
        </p>

        <div className="mt-8 flex items-center justify-between">
          <span style={mono} className="text-sm">
            {selected.length} FILES_SELECTED
          </span>

          <button
            onClick={createPdf}
            disabled={loading}
            style={{ ...mono, borderColor: LINE }}
            className="border bg-sky-500/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="inline animate-spin mr-2" size={16} />
                GENERATING...
              </>
            ) : (
              "CREATE_PDF"
            )}
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => {
            const active = selected.includes(file.id);

            return (
              <div
                key={file.id}
                onClick={() => toggle(file.id)}
                className={`cursor-pointer overflow-hidden border-2 transition-all hover:-translate-y-0.5 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] ${
                  active
                    ? "border-sky-500"
                    : "border-zinc-800"
                }`}
                style={{ background: CARD_BG, borderColor: active ? "#38BDF8" : LINE }}
              >
                <div className="relative">
                  <img
                    src={file.fileUrl}
                    alt={file.title}
                    className="h-52 w-full object-cover"
                  />

                  {active && (
                    <div className="absolute top-3 right-3 rounded-full bg-sky-600 p-1">
                      <Check size={16} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 border-t p-4" style={{ borderColor: LINE }}>
                  <FileImage size={18} style={{ color: BLUE }} />
                  <p style={mono} className="truncate text-sm">
                    {file.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {files.length === 0 && (
          <div
            className="mt-12 border-2 border-dashed p-14 text-center"
            style={{ background: CARD_BG, borderColor: LINE }}
          >
            <FileImage size={50} className="mx-auto" style={{ color: STAMP }} />

            <h2 style={mono} className="mt-6 text-xl font-bold">
              NO_IMAGES_DETECTED
            </h2>

            <p style={mono} className="mt-2 text-xs text-slate-400">
              No target image objects detected in system storage.
            </p>

            <Link
              to="/upload"
              style={{ ...mono, borderColor: LINE }}
              className="mt-6 inline-block border bg-sky-500/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20"
            >
              Upload Image Payload
            </Link>
          </div>
        )}

        {error && (
          <div
            style={mono}
            className="mt-6 border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-400"
          >
            [ERROR] {error}
          </div>
        )}

        {message && (
          <div
            style={mono}
            className="mt-6 border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-400"
          >
            [SUCCESS] {message}
            {createdFile && (
              <div className="mt-4">
                <a
                  href={createdFile.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-semibold"
                >
                  Download PDF
                </a>
                <Link
                  to={`/files/${createdFile.id}`}
                  className="inline-block mt-2 ml-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded text-white font-semibold"
                >
                  View in Files
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}