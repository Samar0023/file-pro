import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Terminal,
  Search,
  Image,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
};

const sans = {
  fontFamily: "'IBM Plex Sans', sans-serif",
};

const PAPER = "#0D1117";
const INK = "#F0F6FC";
const BLUE = "#38BDF8";
const STAMP = "#FF6B4A";
const LINE = "#21262D";
const CARD_BG = "#161B22";

const gridBg = {
  backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px),
  linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
};

type ImageFile = {
  id: string;
  title: string;
  filename: string;
  size: number;
};

const CreatePdf = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [pdfName, setPdfName] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, ] = useState("");
  const [error, setError] = useState("");

  const toggleImage = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const res = await api.get("/files/images");

        setImages(res.data.files || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Unable to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = images.filter((img) =>
    img.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        ...sans,
        background: PAPER,
        color: INK,
      }}
      className="relative min-h-screen"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={gridBg}
      />

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
            to="/pdf"
            style={mono}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-sky-400 hover:underline"
          >
            <ArrowLeft size={16} />
            Return to PDF Dashboard
          </Link>

          <h1
            style={mono}
            className="text-xl font-bold tracking-tight"
          >
            CREATE_PDF
          </h1>

          <div />

        </div>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 py-14">

        <div className="flex items-center gap-3">
          <Terminal
            size={20}
            style={{ color: STAMP }}
          />

          <span
            style={mono}
            className="text-xs uppercase tracking-[0.2em]"
          >
            PDF SYSTEM // BUILD DOCUMENT
          </span>
        </div>

        <h1
          style={mono}
          className="mt-4 text-4xl font-bold tracking-tight"
        >
          Create PDF
        </h1>

        <p
          className="mt-3 text-base"
          style={{ color: `${INK}b3` }}
        >
          Select uploaded images and merge them
          into one PDF document.
        </p>        <div
          className="mt-10 space-y-6 border-2 p-8 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
          style={{
            background: CARD_BG,
            borderColor: LINE,
          }}
        >


          <div>
            <label
              style={mono}
              className="mb-2 block text-xs uppercase tracking-wider text-slate-400"
            >
              Search Uploaded Images
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search images..."
                style={{
                  ...mono,
                  background: PAPER,
                  borderColor: LINE,
                  color: INK,
                }}
                className="w-full border py-3 pl-10 pr-4 outline-none focus:border-sky-400"
              />
            </div>
          </div>

       

          <div>
            <h2
              style={mono}
              className="mb-4 text-lg font-bold"
            >
              Uploaded Images
            </h2>

            <div
              className="max-h-100 overflow-y-auto border"
              style={{
                background: PAPER,
                borderColor: LINE,
              }}
            >
              {filteredImages.length === 0 ? (
                <div
                  className="p-10 text-center text-slate-500"
                  style={mono}
                >
                  No uploaded images found.
                </div>
              ) : (
                filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-center justify-between border-b p-4 hover:bg-zinc-900"
                    style={{
                      borderColor: LINE,
                    }}
                  >
                    <div className="flex items-center gap-4">

                      <input
                        type="checkbox"
                        checked={selected.includes(img.id)}
                        onChange={() => toggleImage(img.id)}
                        className="h-4 w-4 accent-sky-500"
                      />

                      <Image
                        size={22}
                        style={{
                          color: BLUE,
                        }}
                      />

                      <div>

                        <h3
                          style={mono}
                          className="font-semibold"
                        >
                          {img.filename}
                        </h3>

                        <p
                          style={mono}
                          className="text-xs text-slate-500"
                        >
                          {(img.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>          {/* Selected Summary */}

          <div
            className="border p-5"
            style={{
              background: PAPER,
              borderColor: LINE,
            }}
          >
            <div className="flex items-center gap-3">
              <FileText
                size={22}
                style={{ color: BLUE }}
              />

              <div>
                <h2
                  style={mono}
                  className="font-bold"
                >
                  Selected Images
                </h2>

                <p
                  style={mono}
                  className="text-xs text-slate-500"
                >
                  {selected.length} image(s) selected
                </p>
              </div>
            </div>

            {selected.length > 0 && (
              <div className="mt-5 space-y-2">
                {selected.map((id, index) => {
                  const img = images.find((i) => i.id === id);

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border p-3"
                      style={{
                        borderColor: LINE,
                      }}
                    >
                      <span
                        style={mono}
                        className="text-sm"
                      >
                        {index + 1}. {img?.filename}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PDF Name */}

          <div>
            <label
              style={mono}
              className="mb-2 block text-xs uppercase tracking-wider text-slate-400"
            >
              PDF Name
            </label>

            <input
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              placeholder="Project-Document.pdf"
              style={{
                ...mono,
                background: PAPER,
                borderColor: LINE,
                color: INK,
              }}
              className="w-full border p-3 outline-none focus:border-sky-400"
            />
          </div>

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
            style={{
              ...mono,
              borderColor: LINE,
            }}
            className="w-full border bg-sky-500/10 py-4 text-sm font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20"
          >
            {loading ? "GENERATING PDF..." : "CREATE PDF"}
          </button>
        </div>

      </section>
    </main>
  );
};

export default CreatePdf;