import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Eye,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  description: string;
  originalname: string;
  mimeType: string;
  fileUrl: string;
  size: number;
}

const AllImages = () => {
  const [images, setImages] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    try {
      const res = await api.get("/files/allfiles");

      const data = res.data.files.filter(
        (file: FileData) =>
          file.mimeType.startsWith("image/")
      );

      setImages(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await api.delete(`/files/delete/${id}`);
      getImages();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

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

        <Link
          to="/images"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Image Dashboard
        </Link>

        <h1 className="mt-8 text-5xl font-black">
          All Images
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your uploaded images.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
            >
              <img
                src={image.fileUrl}
                alt={image.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <div className="flex items-center gap-3">

                  <ImageIcon className="text-indigo-400" />

                  <h2 className="text-xl font-bold">
                    {image.title}
                  </h2>

                </div>

                <p className="mt-3 text-zinc-400">
                  {image.description}
                </p>

                <p className="mt-3 text-sm text-zinc-500">
                  {image.originalname}
                </p>

                <div className="mt-6 flex gap-3">

                  <Link
                    to={`/images/${image.id}`}
                    className="rounded-xl bg-indigo-600 p-3 hover:bg-indigo-500"
                  >
                    <Eye size={18} />
                  </Link>

                  <a
                    href={image.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-green-600 p-3 hover:bg-green-500"
                  >
                    <Download size={18} />
                  </a>

                  <button
                    onClick={() =>
                      deleteImage(image.id)
                    }
                    className="rounded-xl bg-red-600 p-3 hover:bg-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllImages;