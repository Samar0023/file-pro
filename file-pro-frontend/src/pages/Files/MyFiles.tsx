import { useEffect, useState } from "react";
import {
  Download,
  Trash2,
  Search,
  FileText,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  description: string;
  originalname: string;
  size: number;
  createdAt: string;
}

const MyFiles = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [filtered, setFiltered] = useState<FileData[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getFiles = async () => {
    try {
      const res = await api.get("/files/allfiles");

      setFiles(res.data.files);

      setFiltered(res.data.files);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    const data = files.filter((file) =>
      file.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFiltered(data);
  }, [search, files]);

  const deleteFile = async (id: string) => {
    await api.post(`/files/delete/${id}`);

    getFiles();
  };

  const download = (id: string) => {
    window.open(
      `http://localhost:3000/api/files/download/${id}`,
      "_blank"
    );
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

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <h1 className="text-5xl font-black">
              My Files
            </h1>

            <p className="mt-2 text-zinc-400">
              All uploaded documents.
            </p>

          </div>

          <Link
            to="/upload"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
          >
            <Upload size={18} />
            Upload
          </Link>

        </div>

        <div className="relative mt-10">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search files..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-4 pl-12 pr-5 outline-none focus:border-indigo-500"
          />

        </div>

        <div className="mt-10 space-y-5">        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 py-20 text-center">
            <FileText
              size={60}
              className="mx-auto text-zinc-600"
            />

            <h2 className="mt-8 text-3xl font-bold">
              No Files Found
            </h2>

            <p className="mt-3 text-zinc-500">
              Upload your first document.
            </p>

            <Link
              to="/upload"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
            >
              <Upload size={18} />
              Upload File
            </Link>
          </div>
        ) : (
          filtered.map((file) => (
            <div
              key={file.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 transition hover:border-indigo-500"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-5">
                  <div className="rounded-2xl bg-indigo-500/10 p-4">
                    <FileText
                      size={30}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold break-all">
                      {file.title}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      {file.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-500">
                      <span>{file.originalname}</span>

                      <span>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>

                      <span>
                        {new Date(
                          file.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      download(file.id)
                    }
                    className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 transition hover:border-indigo-500"
                  >
                    <Download size={18} />
                    Download
                  </button>

                  <button
                    onClick={() =>
                      deleteFile(file.id)
                    }
                    className="flex items-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </main>
);

};

export default MyFiles;