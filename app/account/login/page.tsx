"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "forgot";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // --- Forgot password ---
      if (mode === "forgot") {
        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/account/reset-password`,
        });
        if (resetError) {
          setError(resetError.message);
        } else {
          setSuccess("Password reset link sent! Check your email inbox.");
        }
        return;
      }

      // --- Login / Signup ---
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const body = mode === "signup" ? { email, password, name } : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (mode === "signup") {
        setSuccess("Account created! You can now sign in.");
        setMode("login");
        setPassword("");
        return;
      }

      if (data.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/account");
      }
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const accentColor = mode === "signup" ? "pink" : mode === "forgot" ? "amber" : "purple";

  const badgeClass = {
    login: "bg-gradient-to-br from-purple-500/20 to-violet-500/20 shadow-purple-500/10 ring-purple-500/20",
    signup: "bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-pink-500/10 ring-pink-500/20",
    forgot: "bg-gradient-to-br from-amber-500/20 to-orange-500/20 shadow-amber-500/10 ring-amber-500/20",
  }[mode];

  const barClass = {
    login: "via-purple-500/50",
    signup: "via-pink-500/50",
    forgot: "via-amber-500/50",
  }[mode];

  const labelColor = {
    login: "text-purple-400/80",
    signup: "text-pink-400/80",
    forgot: "text-amber-400/80",
  }[mode];

  const focusClass = {
    login: "focus:border-purple-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]",
    signup: "focus:border-pink-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(236,72,153,0.1)]",
    forgot: "focus:border-amber-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  }[mode];

  const btnClass = {
    login: "bg-gradient-to-r from-purple-600 to-violet-600 shadow-purple-500/20 hover:shadow-[0_0_35px_rgba(124,58,237,0.35)]",
    signup: "bg-gradient-to-r from-pink-600 to-rose-600 shadow-pink-500/20 hover:shadow-[0_0_35px_rgba(236,72,153,0.35)]",
    forgot: "bg-gradient-to-r from-amber-600 to-orange-600 shadow-amber-500/20 hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]",
  }[mode];

  const btnHoverClass = {
    login: "bg-gradient-to-r from-purple-500 to-violet-500",
    signup: "bg-gradient-to-r from-pink-500 to-rose-500",
    forgot: "bg-gradient-to-r from-amber-500 to-orange-500",
  }[mode];

  const heading = { login: "Welcome Back", signup: "Create Account", forgot: "Forgot Password" }[mode];
  const subheading = {
    login: "Sign in to your account",
    signup: "Join the STM Events community",
    forgot: "Enter your email to receive a reset link",
  }[mode];

  const btnLabel = {
    login: loading ? "Signing in..." : "Sign In",
    signup: loading ? "Creating..." : "Create Account",
    forgot: loading ? "Sending..." : "Send Reset Link",
  }[mode];

  return (
    <div className="flex min-h-screen flex-col bg-[#07070d]">
      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.06] bg-[#07070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png" alt="STM Events" width={100} height={34} className="h-8 w-auto" priority />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-colors hover:text-white/70"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-12 sm:py-16">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full sm:h-[600px] sm:w-[600px]"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 60%)", filter: "blur(100px)" }}
          />
          <div
            className="absolute top-1/4 right-1/4 h-[250px] w-[250px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 60%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 h-[200px] w-[200px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 60%)", filter: "blur(60px)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
          <div className="absolute top-[20%] left-[12%] h-2 w-2 animate-pulse rounded-full bg-purple-500/25" />
          <div className="absolute top-[30%] right-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-pink-500/20" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[35%] left-[22%] h-1 w-1 animate-pulse rounded-full bg-cyan-500/25" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[25%] right-[20%] h-2 w-2 animate-pulse rounded-full bg-violet-400/20" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="relative z-10 w-full max-w-[420px]">
          {/* Icon badge */}
          <div className="mb-6 flex justify-center">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ring-1 transition-all duration-500 ${badgeClass}`}>
              {mode === "signup" ? (
                <svg className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              ) : mode === "forgot" ? (
                <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-2xl shadow-purple-500/5 backdrop-blur-xl sm:p-8">
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${barClass}`} />

            <h1 className="mb-1 text-center text-2xl font-bold text-white">{heading}</h1>
            <p className="mb-7 text-center text-[13px] text-white/35">{subheading}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field — signup only */}
              {mode === "signup" && (
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-400/80">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 ${focusClass}`}
                      placeholder="Your name"
                    />
                  </div>
                </div>
              )}

              {/* Email field — all modes */}
              <div>
                <label className={`mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] ${labelColor}`}>
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 ${focusClass}`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password field — login & signup only */}
              {mode !== "forgot" && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${labelColor}`}>
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => switchMode("forgot")}
                        className="text-[10px] font-medium text-white/30 transition-colors hover:text-amber-400"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className={`w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 ${focusClass}`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3">
                  <svg className="h-4 w-4 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-[12px] font-medium text-red-400">{error}</p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-3">
                  <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[12px] font-medium text-emerald-400">{success}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full overflow-hidden rounded-xl py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 disabled:opacity-50 ${btnClass}`}
              >
                <span className="relative z-10">{btnLabel}</span>
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${btnHoverClass}`} />
              </button>
            </form>

            {/* Bottom toggles */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              {mode === "forgot" ? (
                <button
                  onClick={() => switchMode("login")}
                  className="text-[12px] font-medium text-white/35 transition-colors hover:text-purple-400"
                >
                  Back to sign in
                </button>
              ) : (
                <button
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  className="text-[12px] font-medium text-white/35 transition-colors hover:text-purple-400"
                >
                  {mode === "login" ? "Don\u2019t have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              )}
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
          </div>

          {/* Features strip */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-purple-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="text-[10px] text-white/20">Book Events</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-pink-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span className="text-[10px] text-white/20">Save Favorites</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-cyan-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-[10px] text-white/20">Rent Gear</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] bg-[#07070d]">
        <div className="mx-auto flex flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <Image src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png" alt="STM Events" width={70} height={24} className="h-5 w-auto opacity-40" />
            <span className="text-[11px] tracking-wider text-white/15">&copy; {new Date().getFullYear()} STM Events</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[11px] text-white/20 transition-colors hover:text-white/40">Home</Link>
            <Link href="/#events" className="text-[11px] text-white/20 transition-colors hover:text-white/40">Events</Link>
            <Link href="/#contact" className="text-[11px] text-white/20 transition-colors hover:text-white/40">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
