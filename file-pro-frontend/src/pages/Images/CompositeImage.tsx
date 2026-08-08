import { useEffect, useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  fileUrl: string;
  mimeType: string;
}

const CompositeImage = () => {
  // Base image ID from URL params (/images/composite/:id)
  const { id: baseId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [gravity, setGravity] = useState("center");
  const [overlayId, setOverlayId] = useState<string>("");
  const [gallery, setGallery] = useState<FileData[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch available overlay images from gallery
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/files/allfiles");
        const images = res.data.files.filter(
          (file: FileData) =>
            file.mimeType.startsWith("image/") && file.id !== baseId
        );
        setGallery(images);
      } catch (err) {
        console.error("Failed to load overlay images", err);
      } finally {
        setFetching(false);
      }
    };

    fetchImages();
  }, [baseId]);

  const compositeImage = async () => {
    if (!overlayId) {
      setError("Please select an overlay image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      // Calls backend endpoint passing baseId and overlayId
      const res = await api.post(`/images/watermark/${baseId}/${overlayId}`, {
        gravity,
      });

      setMessage(res.data.message || "Composition created successfully!");

      setTimeout(() => {
        navigate("/images/all");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? "Composite processing failed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 font-mono text-white">
        LOADING_OVERLAY_DATA...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <Link
          to="/allimages"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Gallery
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3">
              <Layers size={30} className="text-indigo-400" />
            </div>

            <div>
              <h1 className="text-3xl font-black">Composite Image</h1>
              <p className="mt-1 text-zinc-400">
                Select an overlay image and choose its placement position.
              </p>
            </div>
          </div>

          {/* Overlay Image Selection */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">
              1. Select Overlay Image
            </h2>

            {gallery.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No secondary images available in storage.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {gallery.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setOverlayId(img.id)}
                    className={`cursor-pointer overflow-hidden rounded-xl border-2 p-2 transition ${
                      overlayId === img.id
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                    }`}
                  >
                    <img
                      src={img.fileUrl}
                      alt={img.title}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <p className="mt-2 truncate text-xs font-medium text-zinc-300">
                      {img.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Position Matrix Selection */}
          <div className="mt-10">
            <h2 className="mb-5 text-lg font-semibold">
              2. Select Placement Position
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setGravity("northwest")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "northwest"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ↖
              </button>

              <button
                onClick={() => setGravity("north")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "north"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ↑
              </button>

              <button
                onClick={() => setGravity("northeast")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "northeast"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ↗
              </button>

              <button
                onClick={() => setGravity("west")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "west"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ←
              </button>

              <button
                onClick={() => setGravity("center")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "center"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ●
              </button>

              <button
                onClick={() => setGravity("east")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "east"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                →
              </button>

              <button
                onClick={() => setGravity("southwest")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "southwest"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ↙
              </button>

              <button
                onClick={() => setGravity("south")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "south"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ↓
              </button>

              <button
                onClick={() => setGravity("southeast")}
                className={`rounded-xl py-4 font-bold ${
                  gravity === "southeast"
                    ? "bg-indigo-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                ↘
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
              {message}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-950 p-4">
            <h3 className="font-semibold text-white">Config Summary</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Base Image: <span className="text-indigo-400">#{baseId}</span>
            </p>
            <p className="text-sm text-zinc-400">
              Overlay Image:{" "}
              <span className="text-indigo-400">
                {overlayId ? `#${overlayId}` : "None Selected"}
              </span>
            </p>
            <p className="text-sm text-zinc-400 capitalize">
              Placement: <span className="text-indigo-400">{gravity}</span>
            </p>
          </div>

          <button
            onClick={compositeImage}
            disabled={loading || !overlayId}
            className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : "Composite Image"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CompositeImage;