import { useState } from "react";
import { ArrowLeft, Crop } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const CropImage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const cropImage = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await api.post(`/images/crop/${id}`, {
        width,
        height,
        left,
        top,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/images/all");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to crop image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-14">

        <Link
          to="/images/all"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3">
              <Crop
                className="text-indigo-400"
                size={30}
              />
            </div>

            <div>
              <h1 className="text-3xl font-black">
                Crop Image
              </h1>

              <p className="mt-1 text-zinc-400">
                Crop the selected image.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block">
                Width
              </label>

              <input
                type="number"
                value={width}
                onChange={(e) =>
                  setWidth(Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Height
              </label>

              <input
                type="number"
                value={height}
                onChange={(e) =>
                  setHeight(Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Left (X)
              </label>

              <input
                type="number"
                value={left}
                onChange={(e) =>
                  setLeft(Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Top (Y)
              </label>

              <input
                type="number"
                value={top}
                onChange={(e) =>
                  setTop(Number(e.target.value))
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
              />
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

          <button
            onClick={cropImage}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading
              ? "Cropping..."
              : "Crop Image"}
          </button>

        </div>
      </div>
    </main>
  );
};

export default CropImage;