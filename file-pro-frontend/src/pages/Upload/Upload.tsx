import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Upload = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [progress, setProgress] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const chooseFile = () => {
    inputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    setFile(e.target.files[0]);

    setError("");

    setSuccess("");
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    if (!e.dataTransfer.files.length)
      return;

    setFile(e.dataTransfer.files[0]);

    setError("");

    setSuccess("");
  };

  const upload = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!file) {
      setError("Choose a file.");
      return;
    }

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      const formData = new FormData();

      formData.append("title", title);

      formData.append(
        "description",
        description
      );

      formData.append("file", file);

      await api.post(
        "/files/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },

          onUploadProgress: (e) => {
            if (!e.total) return;

            setProgress(
              Math.round(
                (e.loaded * 100) /
                  e.total
              )
            );
          },
        }
      );

      setSuccess(
        "File uploaded successfully."
      );

      setTimeout(() => {
        navigate("/files");
      }, 1000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="border-b border-zinc-800">

        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={20} />
            Dashboard
          </Link>

          <h1 className="text-3xl font-black">
            Upload File
          </h1>

          <div />
        </div>

      </header>

      <section className="mx-auto max-w-3xl px-6 py-14">        <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Project Report"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe this file..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div
            onClick={chooseFile}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-950 p-14 text-center transition hover:border-indigo-500"
          >
            <UploadCloud
              size={70}
              className="mx-auto text-indigo-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Drag & Drop your file
            </h2>

            <p className="mt-2 text-zinc-400">
              or click to browse
            </p>

            <input
              hidden
              ref={inputRef}
              type="file"
              onChange={handleChange}
            />
          </div>

          {file && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-indigo-500/10 p-3">
                  <FileText
                    size={28}
                    className="text-indigo-400"
                  />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold break-all">
                    {file.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

            </div>
          )}        {progress > 0 && (
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-green-400">
            {success}
          </div>
        )}

        <button
          onClick={upload}
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </section>
  </main>
);
};

export default Upload;