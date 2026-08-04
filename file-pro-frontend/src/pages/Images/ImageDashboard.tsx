import { Link } from "react-router-dom";
import {
  Image,
  Images,
  Minimize2,
  Expand,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";

const ImageDashboard = () => {
  const cards = [
    {
      title: "All Images",
      desc: "Browse all uploaded images",
      icon: <Images size={34} />,
      path: "/images/all",
    },
    {
      title: "Compress",
      desc: "Reduce image size",
      icon: <Minimize2 size={34} />,
      path: "/images/compress",
    },
    {
      title: "Resize",
      desc: "Resize image dimensions",
      icon: <Expand size={34} />,
      path: "/images/resize",
    },
    {
      title: "Convert",
      desc: "Convert image formats",
      icon: <RefreshCcw size={34} />,
      path: "/images/convert",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Dashboard
        </Link>

        <div className="mt-10 flex items-center gap-4">
          <div className="rounded-2xl bg-indigo-600/20 p-4">
            <Image size={42} className="text-indigo-400" />
          </div>

          <div>
            <h1 className="text-5xl font-black">
              Image Tools
            </h1>

            <p className="mt-2 text-zinc-400">
              Compress, resize and convert images.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-indigo-500"
            >
              <div className="inline-flex rounded-2xl bg-indigo-600/20 p-4 text-indigo-400">
                {card.icon}
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                {card.title}
              </h2>

              <p className="mt-3 text-zinc-400">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ImageDashboard;