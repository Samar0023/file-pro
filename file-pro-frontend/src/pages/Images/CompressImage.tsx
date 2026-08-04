import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Minimize2 } from "lucide-react";
import api from "../../api/axios";

const CompressImage = () => {
  const [search] = useSearchParams();

  const id = search.get("id");

  const [quality, setQuality] = useState(80);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await api.get(`/files/${id}`);
        setImage(res.data.file);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) getImage();
  }, [id]);

  const compressImage = async () => {
    try {
      setLoading(true);

      const res = await api.post("/images/compress", {
        fileId: id,
        quality,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Compression failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-12">

        <Link
          to={`/images/${id}`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <h1 className="mt-8 text-5xl font-black">
          Compress Image
        </h1>

        {image && (
          <img
            src={image.fileUrl}
            alt=""
            className="mt-8 h-80 w-full rounded-3xl object-cover"
          />
        )}

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <label className="text-lg font-semibold">
            Quality : {quality}%
          </label>

          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) =>
              setQuality(Number(e.target.value))
            }
            className="mt-5 w-full"
          />

          <button
            onClick={compressImage}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-4 font-semibold hover:bg-indigo-500"
          >
            <Minimize2 size={20} />
            {loading
              ? "Compressing..."
              : "Compress Image"}
          </button>

          {message && (
            <p className="mt-6 rounded-xl bg-zinc-800 p-4">
              {message}
            </p>
          )}

        </div>

      </div>
    </main>
  );
};

export default CompressImage;