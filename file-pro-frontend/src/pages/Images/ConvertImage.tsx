import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import api from "../../api/axios";

const ConvertImage = () => {
  const [search] = useSearchParams();

  const id = search.get("id");

  const [image, setImage] = useState<any>(null);

  const [format, setFormat] = useState("png");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

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

  const convertImage = async () => {
    try {
      setLoading(true);

      const res = await api.post("/images/convert", {
        fileId: id,
        format,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Conversion failed"
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
          Convert Image
        </h1>

        {image && (
          <img
            src={image.fileUrl}
            alt=""
            className="mt-8 h-80 w-full rounded-3xl object-cover"
          />
        )}

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <label className="font-semibold">
            Select Output Format
          </label>

          <select
            value={format}
            onChange={(e) =>
              setFormat(e.target.value)
            }
            className="mt-3 w-full rounded-xl bg-zinc-800 p-3"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
            <option value="avif">AVIF</option>
          </select>

          <button
            onClick={convertImage}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-semibold hover:bg-emerald-500"
          >
            <RefreshCcw size={20} />

            {loading
              ? "Converting..."
              : "Convert Image"}
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

export default ConvertImage;