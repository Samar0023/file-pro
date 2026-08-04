import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  description: string;
  originalname: string;
  mimeType: string;
}

const SplitPdf = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getFiles = async () => {
    try {
      const res = await api.get("/files/allfiles");

      const pdfs = res.data.files.filter(
        (file: FileData) =>
          file.mimeType === "application/pdf"
      );

      setFiles(pdfs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const splitPdf = async () => {
    if (!selected) {
      setError("Select a PDF.");
      return;
    }

    try {
      setProcessing(true);

      setError("");

      setMessage("");

      const res = await api.post(
        `/pdf/split-pdf/${selected}`
      );

      setMessage(res.data.message);

      getFiles();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Split failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-5xl px-6 py-14">

        <Link
          to="/pdf"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          PDF Dashboard
        </Link>

        <h1 className="text-5xl font-black">
          Split PDF
        </h1>

        <p className="mt-3 text-zinc-400">
          Select one PDF to split.
        </p>

        <div className="mt-12 space-y-5">{files.length === 0 ? (
  <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 py-20 text-center">
    <FileText
      size={60}
      className="mx-auto text-zinc-600"
    />

    <h2 className="mt-8 text-3xl font-bold">
      No PDF Files
    </h2>

    <p className="mt-3 text-zinc-500">
      Upload a PDF first.
    </p>

    <Link
      to="/upload"
      className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
    >
      Upload PDF
    </Link>
  </div>
) : (
  files.map((file) => (
    <label
      key={file.id}
      className="flex cursor-pointer items-start gap-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-indigo-500"
    >
      <input
        type="radio"
        name="pdf"
        checked={selected === file.id}
        onChange={() =>
          setSelected(file.id)
        }
        className="mt-2 h-5 w-5 accent-indigo-600"
      />

      <div className="rounded-xl bg-indigo-500/10 p-4">
        <FileText
          size={30}
          className="text-indigo-400"
        />
      </div>

      <div className="flex-1">

        <h2 className="text-xl font-bold">
          {file.title}
        </h2>

        <p className="mt-2 text-zinc-400">
          {file.description}
        </p>

        <p className="mt-3 text-sm text-zinc-500">
          {file.originalname}
        </p>

      </div>

    </label>
  ))
)}

{error && (
  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
    {error}
  </div>
)}

{message && (
  <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
    {message}
  </div>
)}
<button
  onClick={splitPdf}
  disabled={processing}
  className="mt-10 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {processing ? "Splitting PDF..." : "Split PDF"}
</button>

</div>

</div>

</main>
);
};

export default SplitPdf;