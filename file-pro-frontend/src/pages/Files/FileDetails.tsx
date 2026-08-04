import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

interface FileData {
  _id: string;
  title: string;
  description: string;
  originalname: string;
  filename: string;
  size: number;
  createdAt: string;
}

const FileDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState<FileData | null>(null);

  const getFile = async () => {
    try {
      const res = await api.get(`/files/${id}`);

      setFile(res.data.file);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFile();
  }, []);

  const download = () => {
    window.open(
      `http://localhost:3000/api/files/download/${id}`,
      "_blank"
    );
  };

  const deleteFile = async () => {
    await api.post(`/files/delete/${id}`);

    navigate("/files");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading...
      </main>
    );
  }

  if (!file) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        File not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-5xl px-6 py-14">

        <Link
          to="/files"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <div className="flex items-center gap-5">

            <div className="rounded-2xl bg-indigo-500/10 p-5">

              <FileText
                size={42}
                className="text-indigo-400"
              />

            </div>

            <div>

              <h1 className="text-4xl font-black">
                {file.title}
              </h1>

              <p className="mt-2 text-zinc-400">
                {file.originalname}
              </p>

            </div>
                      </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

              <h2 className="text-lg font-semibold">
                Description
              </h2>

              <p className="mt-4 leading-8 text-zinc-400">
                {file.description || "No description available."}
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

              <h2 className="text-lg font-semibold">
                File Information
              </h2>

              <div className="mt-6 space-y-4 text-zinc-400">

                <div className="flex justify-between">
                  <span>Size</span>

                  <span>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Uploaded</span>

                  <span>
                    {new Date(
                      file.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Filename</span>

                  <span className="max-w-45 truncate">
                    {file.originalname}
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={download}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
            >
              <Download size={18} />
              Download
            </button>

            <button
              onClick={deleteFile}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={18} />
              Delete
            </button>

          </div>

        </div>

      </div>

    </main>
  );
};

export default FileDetails;

         
          