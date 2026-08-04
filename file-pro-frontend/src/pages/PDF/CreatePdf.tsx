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

const CreatePdf = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getFiles = async () => {
    try {
      const res = await api.get("/files/allfiles");

      const images = res.data.files.filter(
        (file: FileData) =>
          file.mimeType.startsWith("image/")
      );

      setFiles(images);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(
        selected.filter((item) => item !== id)
      );
    } else {
      setSelected([...selected, id]);
    }
  };

  const createPdf = async () => {
    if (selected.length === 0) {
      setError("Select at least one image.");
      return;
    }

    try {
      setProcessing(true);

      setError("");

      setMessage("");

      const res = await api.post(
        "/pdf/create-pdf",
        {
          fileIds: selected,
        }
      );

      setMessage(res.data.message);

      setSelected([]);

      getFiles();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to create PDF."
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
          Create PDF
        </h1>

        <p className="mt-3 text-zinc-400">
          Select images to generate a PDF.
        </p>

        <div className="mt-12 space-y-5">{files.length === 0 ? (
  <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 py-20 text-center">
    <FileText
      size={60}
      className="mx-auto text-zinc-600"
    />

    <h2 className="mt-8 text-3xl font-bold">
      No Images Found
    </h2>

    <p className="mt-3 text-zinc-500">
      Upload images before creating a PDF.
    </p>

    <Link
      to="/upload"
      className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
    >
      Upload Images
    </Link>
  </div>
) : (
  files.map((file) => (
    <label
      key={file.id}
      className="flex cursor-pointer items-start gap-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-indigo-500"
    >
      <input
        type="checkbox"
        checked={selected.includes(file.id)}
        onChange={() =>
          toggleSelect(file.id)
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
)}<button
  onClick={createPdf}
  disabled={processing}
  className="mt-10 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {processing ? "Creating PDF..." : "Create PDF"}
</button>

</div>

</div>

</main>
);
};

export default CreatePdf;