import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  Terminal,
} from "lucide-react";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  description: string;
  OriginalName: string;
  mimeType: string;
  fileUrl: string;
  size: number;
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

const AllImages = () => {
  const [images, setImages] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    try {
      const res = await api.get("/files/allfiles");

      const data = res.data.files.filter((file: FileData) =>
        file.mimeType.startsWith("image/")
      );

      setImages(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await api.post(`/files/delete/${id}`);
      getImages();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

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

      <section className="relative mx-auto max-w-7xl px-6 py-12">
        <Link
          to="/images"
          style={mono}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky-400 hover:underline"
        >
          <ArrowLeft size={16} />
          Return to Image Tools
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <Terminal size={20} style={{ color: STAMP }} />
          <span style={mono} className="text-xs uppercase tracking-[0.2em]">
            System Workspace // Gallery ID #06
          </span>
        </div>

        <h1 style={mono} className="mt-4 text-4xl font-bold tracking-tight">
          Image Gallery
        </h1>

        <p className="mt-3 text-base" style={{ color: `${INK}b3` }}>
          Manage, transform, compose, and export uploaded bitmap assets.
        </p>

        {images.length === 0 ? (
          <div
            className="mt-12 border-2 border-dashed p-14 text-center"
            style={{ background: CARD_BG, borderColor: LINE }}
          >
            <ImageIcon size={50} className="mx-auto" style={{ color: STAMP }} />

            <h2 style={mono} className="mt-6 text-xl font-bold">
              NO_IMAGES_DETECTED
            </h2>

            <p style={mono} className="mt-2 text-xs text-slate-400">
              No target image objects detected in storage system.
            </p>

            <Link
              to="/upload"
              style={{ ...mono, borderColor: LINE }}
              className="mt-6 inline-block border bg-sky-500/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20"
            >
              Upload Image Payload
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden border-2 transition-all hover:-translate-y-0.5 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] flex flex-col justify-between"
                style={{ background: CARD_BG, borderColor: LINE }}
              >
                <div className="border-b" style={{ borderColor: LINE }}>
                  <img
                    src={image.fileUrl}
                    alt={image.title}
                    className="h-56 w-full object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center border"
                        style={{ borderColor: LINE }}
                      >
                        <ImageIcon size={16} style={{ color: BLUE }} />
                      </div>

                      <h2 style={mono} className="text-base font-bold text-sky-400 break-all">
                        {image.title}
                      </h2>
                    </div>

                    <p className="mt-3 text-sm text-slate-400">
                      {image.description}
                    </p>

                    <p style={mono} className="mt-2 text-xs text-slate-500">
                      SRC: {image.OriginalName}
                    </p>
                  </div>

                  {/* Actions Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-2" style={mono}>
                    <Link
                      to={`/images/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      View
                    </Link>

                  
                    <Link
                      to={`/images/compose/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Compose
                    </Link>

                    <Link
                      to={`/images/resize/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Resize
                    </Link>

                    <Link
                      to={`/images/crop/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Crop
                    </Link>

                    <Link
                      to={`/images/rotate/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Rotate
                    </Link>

                    <Link
                      to={`/images/grayscale/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Grayscale
                    </Link>

                    <Link
                      to={`/images/compress/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Compress
                    </Link>

                    <Link
                      to={`/images/convert/${image.id}`}
                      style={{ borderColor: LINE }}
                      className="border bg-zinc-900 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
                    >
                      Convert
                    </Link>

                    <a
                      href={image.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ borderColor: LINE }}
                      className="col-span-2 border bg-sky-500/10 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-sky-400 transition hover:bg-sky-500/20"
                    >
                      Download
                    </a>

                    <button
                      onClick={() => deleteImage(image.id)}
                      className="col-span-2 border border-red-500/40 bg-red-500/10 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-500/20"
                    >
                      Delete Image
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AllImages;