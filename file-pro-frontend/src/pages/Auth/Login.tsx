import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(form);

      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{ ...sans, background: PAPER, color: INK }}
      className="relative flex min-h-screen items-center justify-center px-6 py-12"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

    
      <div className="pointer-events-none absolute inset-0" style={gridBg} />

      <div className="relative w-full max-w-md">
      
        <div className="mb-8 text-center">
          <Link
            to="/"
            style={mono}
            className="inline-flex items-baseline gap-2 text-2xl font-bold tracking-tight"
          >
            <span>FILE</span>
            <span style={{ color: STAMP }}>—</span>
            <span style={{ color: BLUE }}>PRO</span>
          </Link>
          <div
            style={{ ...mono, borderColor: LINE }}
            className="mt-4 inline-block border px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
          >
            Auth Spec // Terminal Sign-In
          </div>
        </div>

     
        <div
          className="relative border-2 p-8 shadow-[6px_6px_0_0_rgba(0,0,0,0.6)]"
          style={{ background: CARD_BG, borderColor: LINE }}
        >
          
          <div
            className="absolute -top-1 -right-1 h-3 w-3 border-r-2 border-t-2"
            style={{ borderColor: STAMP }}
          />

          <div
            className="mb-6 flex items-center justify-between border-b pb-4"
            style={{ borderColor: LINE }}
          >
            <h1 style={mono} className="text-xl font-bold uppercase tracking-tight">
              User Login
            </h1>
            <span style={{ ...mono, color: `${INK}66` }} className="text-xs">
              SEC-LVL 1
            </span>
          </div>

          {error && (
            <div
              style={mono}
              className="mb-6 border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400"
            >
              [ERROR]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                style={mono}
                className="mb-2 block text-xs uppercase tracking-[0.1em]"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="sys_user"
                style={{
                  ...mono,
                  background: PAPER,
                  borderColor: LINE,
                  color: INK,
                }}
                className="w-full border px-4 py-3 text-sm outline-none transition focus:border-sky-400"
              />
            </div>

            <div>
              <label
                style={mono}
                className="mb-2 block text-xs uppercase tracking-[0.1em]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="user@domain.com"
                style={{
                  ...mono,
                  background: PAPER,
                  borderColor: LINE,
                  color: INK,
                }}
                className="w-full border px-4 py-3 text-sm outline-none transition focus:border-sky-400"
              />
            </div>

            <div>
              <label
                style={mono}
                className="mb-2 block text-xs uppercase tracking-[0.1em]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  style={{
                    ...mono,
                    background: PAPER,
                    borderColor: LINE,
                    color: INK,
                  }}
                  className="w-full border px-4 py-3 pr-12 text-sm outline-none transition focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: `${INK}80` }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs" style={mono}>
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: `${INK}b3` }}>
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded-none border-zinc-700 bg-zinc-900 accent-sky-400"
                />
                REMEMBER SESSION
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...mono,
                background: INK,
                color: PAPER,
              }}
              className="flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "EXECUTE LOGIN"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: LINE }} />
            <span style={{ ...mono, color: `${INK}40` }} className="text-xs">
              OR
            </span>
            <div className="h-px flex-1" style={{ background: LINE }} />
          </div>

          <p style={mono} className="text-center text-xs" >
            <span style={{ color: `${INK}80` }}>NO ACCOUNT REGISTERED? </span>
            <Link
              to="/signup"
              style={{ color: BLUE }}
              className="font-medium underline hover:opacity-80"
            >
              CREATE ONE
            </Link>
          </p>
        </div>

 
        <Link
          to="/"
          style={{ ...mono, color: `${INK}80` }}
          className="mt-6 block text-center text-xs tracking-wider uppercase hover:text-white"
        >
          ← RETURN TO SYSTEM INDEX
        </Link>
      </div>
    </main>
  );
};

export default Login;