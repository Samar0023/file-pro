import { useState } from "react";
import { ArrowLeft, Palette } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const GrayScaleImage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const convertGrayScale = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await api.post(
        `/images/grayscale/${id}`
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/images/all");
      }, 1500);

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to convert image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-14"><Link
  to="/images/all"
  className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
>
  <ArrowLeft size={18} />
  Back
</Link>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

  <div className="flex items-center gap-4">

    <div className="rounded-xl bg-indigo-500/10 p-3">
      <Palette
        size={30}
        className="text-indigo-400"
      />
    </div>

    <div>

      <h1 className="text-3xl font-black">
        GrayScale Image
      </h1>

      <p className="mt-1 text-zinc-400">
        Convert your colored image into a beautiful grayscale version.
      </p>

    </div>

  </div>

  <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-950 p-10 text-center">

    <Palette
      size={70}
      className="mx-auto text-zinc-600"
    />

    <h2 className="mt-6 text-2xl font-bold">
      GrayScale Converter
    </h2>

    <p className="mt-3 text-zinc-500">
      Click the button below to create a grayscale copy of your image.
    </p>

  </div>{error && (
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
  onClick={convertGrayScale}
  disabled={loading}
  className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Converting..."
    : "Convert to GrayScale"}
</button>

</div>      </div>
    </main>
  );
};

export default GrayScaleImage;