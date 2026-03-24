"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black px-5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full sm:h-[600px] sm:w-[600px]"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image src="/logoo.png" alt="STM Events" width={50} height={50} />
        </div>

        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
          <h1 className="mb-1 text-center text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
            Admin Login
          </h1>
          <p className="mb-6 text-center text-sm text-white/40">
            Sign in to manage your content
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-purple-500/50"
                placeholder="admin@stm-events.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-purple-500/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
