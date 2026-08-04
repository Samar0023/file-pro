import { useRef, useState } from "react";
import { UploadCloud, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

interface Props {
  title: string;
  description: string;
  endpoint: string;
  buttonText: string;
  multiple?: boolean;
}

const PdfTool = ({
  title,
  description,
  endpoint,
  buttonText,
  multiple = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const chooseFiles = () => {
    inputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setFiles(Array.from(e.target.files));

    setError("");
    setSuccess("");
  };

  const upload = async () => {
    if (!files.length) {
      setError("Select file(s).");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        responseType: "blob",

        onUploadProgress: (e) => {
          if (!e.total) return;

          setProgress(
            Math.round((e.loaded * 100) / e.total)
          );
        },
      });

      setSuccess("Operation completed successfully.");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <Link
          to="/pdf"
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          PDF Dashboard
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h1 className="text-4xl font-black">
            {title}
          </h1>

          <p className="mt-3 text-zinc-400">
            {description}
          </p>

          <div
            onClick={chooseFiles}
            className="mt-10 cursor-pointer rounded-3xl border-2 border-dashed border-zinc-700 bg-zinc-950 p-14 text-center transition hover:border-indigo-500"
          >
            <UploadCloud
              size={70}
              className="mx-auto text-indigo-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Choose PDF
            </h2>

            <p className="mt-2 text-zinc-400">
              Click to browse
            </p>

            <input
              hidden
              ref={inputRef}
              type="file"
              accept=".pdf,image/*"
              multiple={multiple}
              onChange={handleChange}
            />
          </div>

          {files.length > 0 && (
            <div className="mt-8 space-y-3">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                >
                  <FileText
                    size={28}
                    className="text-indigo-400"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold break-all">
                      {file.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {progress > 0 && (
            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                  className="h-full rounded-full bg-indigo-600 transition-all"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
              {success}
            </div>
          )}

          <button
            disabled={loading}
            onClick={upload}
            className="mt-10 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : buttonText}
          </button>
        </div>
      </div>
    </main>
  );
};

export default PdfTool;