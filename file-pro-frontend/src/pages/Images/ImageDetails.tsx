import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Minimize2,
  Expand,
  RefreshCcw,
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

const ImageDetails = () => {
  const { id } = useParams();

  const [image, setImage] = useState<FileData | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const getImage = async () => {
    try {
      const res = await api.get(`/files/${id}`);
      setImage(res.data.file);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading...
      </main>
    );
  }

  if (!image) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Image Not Found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <Link
          to="/images/all"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          All Images
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">

          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

            <img
              src={image.fileUrl}
              alt={image.title}
              className="w-full object-cover"
            />

          </div>

          <div>

            <div className="flex items-center gap-3">

              <ImageIcon className="text-indigo-400" />

              <h1 className="text-4xl font-black">
                {image.title}
              </h1>

            </div>

            <p className="mt-5 text-zinc-400">
              {image.description}
            </p>

            <div className="mt-8 space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <p>
                <span className="font-semibold">
                  Original Name:
                </span>{" "}
                {image.originalname}
              </p>

              <p>
                <span className="font-semibold">
                  MIME Type:
                </span>{" "}
                {image.mimeType}
              </p>

              <p>
                <span className="font-semibold">
                  Size:
                </span>{" "}
                {(image.size / 1024).toFixed(2)} KB
              </p>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">

              <Link
                to={`/images/compress?id=${image.id}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-semibold hover:bg-indigo-500"
              >
                <Minimize2 size={20} />
                Compress
              </Link>

              <Link
                to={`/images/resize?id=${image.id}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold hover:bg-blue-500"
              >
                <Expand size={20} />
                Resize
              </Link>

              <Link
                to={`/images/convert?id=${image.id}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 font-semibold hover:bg-emerald-500"
              >
                <RefreshCcw size={20} />
                Convert
              </Link>

              <a
                href={image.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-orange-600 py-4 font-semibold hover:bg-orange-500"
              >
                <Download size={20} />
                Download
              </a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default ImageDetails;