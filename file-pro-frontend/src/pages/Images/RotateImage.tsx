import { useState } from "react";
import { ArrowLeft, RotateCw } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const RotateImage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

 const [rotation, setRotation] = useState(90);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const rotateImage = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await api.post(
        `/images/rotate/${id}`,
        {
          rotation,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/images/all");
      }, 1500);

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Rotation failed."
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
      <RotateCw
        size={30}
        className="text-indigo-400"
      />
    </div>

    <div>

      <h1 className="text-3xl font-black">
        Rotate Image
      </h1>

      <p className="mt-1 text-zinc-400">
        Rotate your image to any angle.
      </p>

    </div>

  </div>

  <div className="mt-10">

    <label className="mb-2 block text-sm font-medium">
      Rotation Angle
    </label>

    <input
      type="number"
      value={rotation}
      onChange={(e) =>
        setRotation(Number(e.target.value))
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
      placeholder="90"
    />

    <div className="mt-6 grid grid-cols-3 gap-3">

      <button
        onClick={() => setRotation(90)}
        className="rounded-xl bg-zinc-800 py-3 hover:bg-indigo-600"
      >
        90°
      </button>

      <button
        onClick={() => setRotation(180)}
        className="rounded-xl bg-zinc-800 py-3 hover:bg-indigo-600"
      >
        180°
      </button>

      <button
        onClick={() => setRotation(270)}
        className="rounded-xl bg-zinc-800 py-3 hover:bg-indigo-600"
      >
        270°
      </button>

    </div>

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
  onClick={rotateImage}
  disabled={loading}
  className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Rotating..."
    : "Rotate Image"}
</button>

</div>      </div>
    </main>
  );
};

export default RotateImage;