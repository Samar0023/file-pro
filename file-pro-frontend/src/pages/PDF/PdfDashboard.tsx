import {
  Merge,
  FileOutput,
  Minimize2,
  Image,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const PdfDashboard = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <Link
          to="/dashboard"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Dashboard
        </Link>

        <h1 className="text-5xl font-black">
          PDF Tools
        </h1>

        <p className="mt-3 text-zinc-400">
          Powerful PDF processing tools.
        </p>

        <div className="mt-14 grid gap-7 md:grid-cols-2">

          <Link
            to="/pdf/merge"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >

            <Merge
              size={42}
              className="text-indigo-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Merge PDFs
            </h2>

            <p className="mt-3 text-zinc-400">
              Combine multiple PDF files into one.
            </p>

          </Link>

          <Link
            to="/pdf/split"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >

            <FileOutput
              size={42}
              className="text-indigo-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Split PDF
            </h2>

            <p className="mt-3 text-zinc-400">
              Extract selected pages.
            </p>

          </Link>          <Link
            to="/pdf/compress"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <Minimize2
              size={42}
              className="text-indigo-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Compress PDF
            </h2>

            <p className="mt-3 text-zinc-400">
              Reduce PDF size while keeping quality.
            </p>
          </Link>

          <Link
            to="/pdf/create"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <Image
              size={42}
              className="text-indigo-400"
            />

            <h2 className="mt-6 text-2xl font-bold">
              Images to PDF
            </h2>

            <p className="mt-3 text-zinc-400">
              Convert one or multiple images into a PDF.
            </p>
          </Link>

        </div>

        <div className="mt-20 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-10">

          <h2 className="text-3xl font-black">
            PDF Toolkit
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-zinc-400">
            Process PDF files directly from your browser.
            Merge multiple documents, split pages, compress
            large PDFs and convert images into professional
            PDF documents using File-Pro.
          </p>

        </div>

      </div>

    </main>
  );
};

export default PdfDashboard;