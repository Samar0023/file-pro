import { useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const CompositeImage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [gravity, setGravity] = useState("center");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const compositeImage = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await api.post(
        `/images/composite/${id}`,
        {
          gravity,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/images/all");
      }, 1500);

    } catch (err: any) {
      setError(
        err.response?.data?.message ??
        "Composite failed."
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
      <Layers
        size={30}
        className="text-indigo-400"
      />
    </div>

    <div>

      <h1 className="text-3xl font-black">
        Composite Image
      </h1>

      <p className="mt-1 text-zinc-400">
        Choose where the overlay image should be placed.
      </p>

    </div>

  </div>

  <div className="mt-10">

    <h2 className="mb-5 text-lg font-semibold">
      Select Position
    </h2>

    <div className="grid grid-cols-3 gap-4">

      <button
        onClick={() => setGravity("northwest")}
        className={`rounded-xl py-4 ${
          gravity === "northwest"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ↖
      </button>

      <button
        onClick={() => setGravity("north")}
        className={`rounded-xl py-4 ${
          gravity === "north"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ↑
      </button>

      <button
        onClick={() => setGravity("northeast")}
        className={`rounded-xl py-4 ${
          gravity === "northeast"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ↗
      </button>

      <button
        onClick={() => setGravity("west")}
        className={`rounded-xl py-4 ${
          gravity === "west"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ←
      </button>

      <button
        onClick={() => setGravity("center")}
        className={`rounded-xl py-4 ${
          gravity === "center"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ●
      </button>

      <button
        onClick={() => setGravity("east")}
        className={`rounded-xl py-4 ${
          gravity === "east"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        →
      </button>

      <button
        onClick={() => setGravity("southwest")}
        className={`rounded-xl py-4 ${
          gravity === "southwest"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ↙
      </button>

      <button
        onClick={() => setGravity("south")}
        className={`rounded-xl py-4 ${
          gravity === "south"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ↓
      </button>

      <button
        onClick={() => setGravity("southeast")}
        className={`rounded-xl py-4 ${
          gravity === "southeast"
            ? "bg-indigo-600"
            : "bg-zinc-800 hover:bg-zinc-700"
        }`}
      >
        ↘
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

<div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-950 p-4">

  <h3 className="font-semibold text-white">
    Selected Position
  </h3>

  <p className="mt-2 text-zinc-400 capitalize">
    {gravity}
  </p>

</div>

<button
  onClick={compositeImage}
  disabled={loading}
  className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Processing..."
    : "Composite Image"}
</button>

</div>      </div>
    </main>
  );
};

export default CompositeImage;