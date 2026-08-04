import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Image,
  Share2,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Upload Files",
    description: "Fast and secure uploads for every document.",
    icon: <FileText size={26} />,
  },
  {
    title: "Image Tools",
    description: "Resize, crop and optimize images instantly.",
    icon: <Image size={26} />,
  },
  {
    title: "Secure Sharing",
    description: "Generate protected links in one click.",
    icon: <Share2 size={26} />,
  },
  {
    title: "Lightning Fast",
    description: "Built for performance using Sharp.",
    icon: <Zap size={26} />,
  },
  {
    title: "Enterprise Security",
    description: "JWT authentication and secure storage.",
    icon: <Shield size={26} />,
  },
];

const Landing = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="text-3xl font-black tracking-tight"
          >
            File<span className="text-indigo-500">Pro</span>
          </Link>

          <nav className="hidden items-center gap-10 text-sm font-medium text-zinc-400 lg:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#workflow" className="transition hover:text-white">
              Workflow
            </a>

            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>

            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-zinc-700 px-5 py-2.5 transition hover:border-zinc-500"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium transition hover:bg-indigo-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-20 px-6 py-20 lg:grid-cols-2">
        <div>
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
            Modern File Processing Platform
          </span>

          <h1 className="mt-8 text-6xl font-black leading-[1.05] tracking-tight lg:text-7xl">
            Build.
            <br />
            Process.
            <br />
            Share.
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-400">
            Upload files, merge PDFs, resize images and securely share
            everything from one beautiful workspace.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-semibold transition hover:bg-indigo-500"
            >
              Start Free
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-zinc-700 px-7 py-4 transition hover:border-indigo-500"
            >
              Login
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-8 text-sm text-zinc-500">
            <span>Secure</span>
            <span>Fast</span>
            <span>Reliable</span>
            <span>Developer Friendly</span>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Storage</h3>
              <p className="mt-1 text-sm text-zinc-400">
                72% Used
              </p>
            </div>

            <div className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold">
              Active
            </div>
          </div>

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-[72%] rounded-full bg-indigo-500" />
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div>
                <p className="font-semibold">invoice.pdf</p>
                <p className="mt-1 text-sm text-zinc-500">
                  PDF Document
                </p>
              </div>

              <span className="text-sm font-medium text-green-400">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div>
                <p className="font-semibold">design.png</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Image Processing
                </p>
              </div>

              <span className="text-sm font-medium text-yellow-400">
                Processing
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div>
                <p className="font-semibold">contract.pdf</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Shared File
                </p>
              </div>

              <span className="text-sm font-medium text-indigo-400">
                Shared
              </span>
            </div>
          </div>
        </div>
      </section>      <section
        id="features"
        className="border-t border-zinc-900"
      >
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
              Features
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-tight">
              Everything in one place.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              File-Pro combines uploads, PDF processing, image tools and secure
              file sharing into a single workflow.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-500"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  {feature.icon}
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="border-t border-zinc-900"
      >
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
              Workflow
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Three simple steps.
            </h2>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
              <span className="text-5xl font-black text-indigo-500">
                01
              </span>

              <h3 className="mt-8 text-2xl font-bold">
                Upload
              </h3>

              <p className="mt-4 leading-8 text-zinc-400">
                Drag and drop any document, PDF or image into your workspace.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
              <span className="text-5xl font-black text-indigo-500">
                02
              </span>

              <h3 className="mt-8 text-2xl font-bold">
                Process
              </h3>

              <p className="mt-4 leading-8 text-zinc-400">
                Merge PDFs, optimize images and perform file operations in
                seconds.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
              <span className="text-5xl font-black text-indigo-500">
                03
              </span>

              <h3 className="mt-8 text-2xl font-bold">
                Share
              </h3>

              <p className="mt-4 leading-8 text-zinc-400">
                Download your processed files or generate secure share links.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-t border-zinc-900"
      >
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="rounded-[40px] border border-zinc-800 bg-zinc-900 px-10 py-20 text-center md:px-20">
            <h2 className="text-5xl font-black leading-tight">
              Ready to simplify
              <br />
              your file workflow?
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
              Start using File-Pro today and manage all your files from one
              powerful dashboard.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition hover:bg-indigo-500"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-zinc-700 px-8 py-4 transition hover:border-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="border-t border-zinc-900"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-zinc-500 md:flex-row">
          <div>
            <span className="text-xl font-black text-white">
              File
            </span>
            <span className="text-xl font-black text-indigo-500">
              Pro
            </span>
          </div>

          <p>© 2026 File-Pro. All rights reserved.</p>

          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white">
              Privacy
            </a>

            <a href="#" className="hover:text-white">
              Terms
            </a>

            <a href="#" className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;