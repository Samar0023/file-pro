import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Expand } from "lucide-react";
import api from "../../api/axios";

const ResizeImage = () => {
  const [search] = useSearchParams();

  const id = search.get("id");

  const [image, setImage] = useState<any>(null);

  const [width, setWidth] = useState(800);

  const [height, setHeight] = useState(800);

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

  const resizeImage = async () => {
    try {
      setLoading(true);

      const res = await api.post(`/images/resize/${id}`, {
        width,
        height,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Resize failed"
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
          Resize Image
        </h1>

        {image && (
          <img
            src={image.fileUrl}
            alt=""
            className="mt-8 h-80 w-full rounded-3xl object-cover"
          />
        )}

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <div>
            <label>Width</label>

            <input
              type="number"
              value={width}
              onChange={(e) =>
                setWidth(Number(e.target.value))
              }
              className="mt-2 w-full rounded-xl bg-zinc-800 p-3"
            />
          </div>

          <div className="mt-6">
            <label>Height</label>

            <input
              type="number"
              value={height}
              onChange={(e) =>
                setHeight(Number(e.target.value))
              }
              className="mt-2 w-full rounded-xl bg-zinc-800 p-3"
            />
          </div>

          <button
            onClick={resizeImage}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold hover:bg-blue-500"
          >
            <Expand size={20} />

            {loading
              ? "Resizing..."
              : "Resize Image"}
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

export default ResizeImage;