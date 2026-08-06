import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
 
  Image as ImageIcon,
} from "lucide-react";
import api from "../../api/axios";

interface FileData {
  id: string;
  title: string;
  description: string;
  OriginalName: string;
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

        <p className="mt-3 text-zinc-400">
          Manage your uploaded images.
        </p>

        {images.length === 0 ? (
          <div className="mt-20 rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 py-20 text-center">

            <ImageIcon
              size={70}
              className="mx-auto text-zinc-600"
            />

            <h2 className="mt-6 text-3xl font-bold">
              No Images Found
            </h2>

            <p className="mt-3 text-zinc-500">
              Upload your first image.
            </p>

            <Link
              to="/upload"
              className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
            >
              Upload Image
            </Link>

          </div>
        ) : (

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{images.map((image) => (
  <div
    key={image.id}
    className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-indigo-500"
  >
    <img
      src={image.fileUrl}
      alt={image.title}
      className="h-64 w-full object-cover"
    />

    <div className="p-6">

      <div className="flex items-center gap-3">
        <ImageIcon
          size={22}
          className="text-indigo-400"
        />

        <h2 className="text-xl font-bold">
          {image.title}
        </h2>
      </div>

      <p className="mt-3 text-zinc-400">
        {image.description}
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        {image.OriginalName}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">

        <Link
          to={`/images/${image.id}`}
          className="rounded-xl bg-indigo-600 py-3 text-center font-semibold hover:bg-indigo-500"
        >
          View
        </Link>

        <Link
          to={`/images/resize/${image.id}`}
          className="rounded-xl bg-blue-600 py-3 text-center font-semibold hover:bg-blue-500"
        >
          Resize
        </Link>

        <Link
          to={`/images/crop/${image.id}`}
          className="rounded-xl bg-orange-600 py-3 text-center font-semibold hover:bg-orange-500"
        >
          Crop
        </Link>

        <Link
          to={`/images/rotate/${image.id}`}
          className="rounded-xl bg-purple-600 py-3 text-center font-semibold hover:bg-purple-500"
        >
          Rotate
        </Link>        <Link
          to={`/images/grayscale/${image.id}`}
          className="rounded-xl bg-zinc-700 py-3 text-center font-semibold hover:bg-zinc-600"
        >
          GrayScale
        </Link>

        <Link
          to={`/images/compress/${image.id}`}
          className="rounded-xl bg-emerald-600 py-3 text-center font-semibold hover:bg-emerald-500"
        >
          Compress
        </Link>

        <Link
          to={`/images/convert/${image.id}`}
          className="rounded-xl bg-pink-600 py-3 text-center font-semibold hover:bg-pink-500"
        >
          Convert
        </Link>

        <a
          href={image.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-green-600 py-3 text-center font-semibold hover:bg-green-500"
        >
          Download
        </a>

        <button
          onClick={() => deleteImage(image.id)}
          className="col-span-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500"
        >
          Delete Image
        </button>

      </div>

    </div>

  </div>
))}        </div>
      )}

    </div>
  </main>
);
};

export default AllImages;