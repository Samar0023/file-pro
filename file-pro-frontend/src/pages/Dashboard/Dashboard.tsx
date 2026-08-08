import { Link, useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Image,
  Share2,
  User,
  LogOut,
  Files,
  Terminal,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const mono = { fontFamily: "'IBM Plex Mono', monospace" };
const sans = { fontFamily: "'IBM Plex Sans', sans-serif" };


const PAPER = "#0D1117";      
const INK = "#F0F6FC";        
const BLUE = "#38BDF8";       
const STAMP = "#FF6B4A";      
const LINE = "#21262D";       
const CARD_BG = "#161B22";    

const gridBg = {
  backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    {
      to: "/upload",
      code: "UP",
      title: "Upload Files",
      description: "Upload and manage document streams.",
      icon: <Upload size={24} style={{ color: BLUE }} />,
    },
    {
      to: "/files",
      code: "DIR",
      title: "My Files",
      description: "Access and filter stored repository files.",
      icon: <Files size={24} style={{ color: BLUE }} />,
    },
    {
      to: "/pdf",
      code: "PDF",
      title: "PDF Tools",
      description: "Merge, split, and manipulate PDF pipelines.",
      icon: <FileText size={24} style={{ color: BLUE }} />,
    },
    {
      to: "/images",
      code: "IMG",
      title: "Image Tools",
      description: "Resize, crop, and optimize bitmap visuals.",
      icon: <Image size={24} style={{ color: BLUE }} />,
    },
   
  ];

  return (
    <main
      style={{ ...sans, background: PAPER, color: INK }}
      className="relative min-h-screen"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="pointer-events-none absolute inset-0" style={gridBg} />

    
      <header
        className="sticky top-0 z-50 border-b"
        style={{ borderColor: LINE, background: `${PAPER}e6`, backdropFilter: "blur(8px)" }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" style={mono} className="flex items-baseline gap-2 text-2xl font-bold tracking-tight">
            <span>FILE</span>
            <span style={{ color: STAMP }}>—</span>
            <span style={{ color: BLUE }}>PRO</span>
          </Link>

          <div className="flex items-center gap-6">
            <div style={mono} className="hidden text-right text-xs md:block">
              <p className="font-semibold tracking-wide" style={{ color: INK }}>
                {user?.username || "sys_user"}
              </p>
              <p style={{ color: `${INK}80` }}>{user?.email || "user@system.local"}</p>
            </div>

            <button
              onClick={handleLogout}
              style={{ ...mono, borderColor: LINE }}
              className="flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-wider transition hover:border-red-500 hover:text-red-400"
              title="Logout Session"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">EXIT</span>
            </button>
          </div>
        </div>
      </header>

   
      <section className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center gap-3">
          <Terminal size={20} style={{ color: STAMP }} />
          <span style={mono} className="text-xs uppercase tracking-[0.2em]">
            System Workspace // Terminal ID #01
          </span>
        </div>

        <h1 style={mono} className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Control Panel
        </h1>

        <p className="mt-3 text-base" style={{ color: `${INK}b3` }}>
          Active Session: <span style={mono} className="text-sky-400">{user?.username}</span>
        </p>


        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {navItems.map((item) => (
            <Link
              key={item.code}
              to={item.to}
              className="group relative border-2 p-8 transition-all hover:-translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
              style={{ background: CARD_BG, borderColor: LINE }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center border"
                  style={{ borderColor: LINE }}
                >
                  {item.icon}
                </div>
                <span style={mono} className="text-xs">
                  <span style={{ color: `${INK}66` }}>[</span>
                  <span style={{ color: STAMP }}>{item.code}</span>
                  <span style={{ color: `${INK}66` }}>]</span>
                </span>
              </div>

              <h2 style={mono} className="mt-6 text-xl font-bold group-hover:text-sky-400">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${INK}80` }}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;