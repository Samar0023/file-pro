import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Upload,
  FileText,
  Image,
  Share2,
  User,
  LogOut,
  Files,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    user,
    loading,
    logout,
    getProfile,
  } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="border-b border-zinc-800">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <h1 className="text-3xl font-black">
            File<span className="text-indigo-500">Pro</span>
          </h1>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold">
                {user?.username}
              </p>

              <p className="text-sm text-zinc-500">
                {user?.email}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-zinc-700 p-3 transition hover:border-red-500"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

      </header>

      <section className="mx-auto max-w-7xl px-6 py-14">

        <h2 className="text-5xl font-black">
          Dashboard
        </h2>

        <p className="mt-3 text-lg text-zinc-400">
          Welcome back,
          {" "}
          {user?.username}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <Link
            to="/upload"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <Upload
              size={34}
              className="text-indigo-400"
            />

            <h3 className="mt-6 text-2xl font-bold">
              Upload Files
            </h3>

            <p className="mt-3 text-zinc-400">
              Upload and manage files.
            </p>

          </Link>

          <Link
            to="/files"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <Files
              size={34}
              className="text-indigo-400"
            />

            <h3 className="mt-6 text-2xl font-bold">
              My Files
            </h3>

            <p className="mt-3 text-zinc-400">
              View uploaded files.
            </p>

          </Link>

          <Link
            to="/pdf"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <FileText
              size={34}
              className="text-indigo-400"
            />

            <h3 className="mt-6 text-2xl font-bold">
              PDF Tools
            </h3>

            <p className="mt-3 text-zinc-400">
              Merge and split PDFs.
            </p>

          </Link>
                    <Link
            to="/images"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <Image
              size={34}
              className="text-indigo-400"
            />

            <h3 className="mt-6 text-2xl font-bold">
              Image Tools
            </h3>

            <p className="mt-3 text-zinc-400">
              Resize, crop and optimize images.
            </p>
          </Link>

          <Link
            to="/share"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <Share2
              size={34}
              className="text-indigo-400"
            />

            <h3 className="mt-6 text-2xl font-bold">
              Share Files
            </h3>

            <p className="mt-3 text-zinc-400">
              Generate secure share links.
            </p>
          </Link>

          <Link
            to="/profile"
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-indigo-500"
          >
            <User
              size={34}
              className="text-indigo-400"
            />

            <h3 className="mt-6 text-2xl font-bold">
              Profile
            </h3>

            <p className="mt-3 text-zinc-400">
              Manage your account settings.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;