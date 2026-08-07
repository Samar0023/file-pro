import { useEffect, useState } from "react";
import axios from "axios";
import { FileImage, Check, Loader2 } from "lucide-react";

interface FileItem {
  _id: string;
  filename: string;
  url: string;
  mimetype: string;
}

const API = import.meta.env.VITE_API_URL;

export default function CreatePdf() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    try {
      const { data } = await axios.get(`${API}/api/files`, {
        withCredentials: true,
      });

      const images = data.files.filter((file: FileItem) =>
        file.mimetype.startsWith("image/")
      );

      setFiles(images);
    } catch (err) {
      console.log(err);
    }
  }

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  async function createPdf() {
    if (!selected.length) {
      return alert("Select at least one image.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/api/pdf/create-pdf`,
        {
          fileIds: selected,
        },
        {
          withCredentials: true,
        }
      );

      alert("PDF created successfully!");

      console.log(data);

      setSelected([]);
    } catch (err) {
      console.log(err);
      alert("Failed to create PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Create PDF
        </h1>

        <p className="text-gray-400 mb-8">
          Select images to merge into a PDF
        </p>

        <div className="mb-6 flex justify-between items-center">
          <span className="text-lg">
            {selected.length} Selected
          </span>

          <button
            onClick={createPdf}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating...
              </>
            ) : (
              "Create PDF"
            )}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {files.map((file) => {
            const active = selected.includes(file._id);

            return (
              <div
                key={file._id}
                onClick={() => toggle(file._id)}
                className={`cursor-pointer rounded-xl overflow-hidden border transition
                  ${
                    active
                      ? "border-blue-500 ring-2 ring-blue-500"
                      : "border-zinc-800 hover:border-zinc-500"
                  }`}
              >
                <div className="relative">

                  <img
                    src={file.url}
                    className="w-full h-52 object-cover"
                  />

                  {active && (
                    <div className="absolute top-3 right-3 bg-blue-600 rounded-full p-1">
                      <Check size={16} />
                    </div>
                  )}
                </div>

                <div className="p-4 flex items-center gap-2">
                  <FileImage size={18} />
                  <p className="truncate text-sm">
                    {file.filename}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
