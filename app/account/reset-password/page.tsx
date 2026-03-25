"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  // Supabase automatically picks up the recovery token from the URL hash
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also mark ready after a short delay in case the event already fired
    const timeout = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/account/login");
      }, 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#07070d]">
      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.06] bg-[#07070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image src="https://res.cloudinary.com/dqiuwzvfb/image/upload/v1774434332/logoo_bho6qe.png" alt="STM Events" width={100} height={34} className="h-8 w-auto" priority />
          </Link>
          <Link
            href="/account/login"
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-colors hover:text-white/70"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-12 sm:py-16">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full sm:h-[600px] sm:w-[600px]"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)", filter: "blur(100px)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[420px]">
          {/* Icon badge */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20">
              {success ? (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              )}
            </div>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            {success ? (
              <div className="text-center">
                <h1 className="mb-2 text-2xl font-bold text-white">Password Updated</h1>
                <p className="mb-4 text-[13px] text-white/35">Your password has been reset successfully.</p>
                <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-3">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[12px] font-medium text-emerald-400">Redirecting to login...</p>
                </div>
              </div>
            ) : !ready ? (
              <div className="flex flex-col items-center py-4">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-500" />
                <p className="text-[13px] text-white/35">Verifying reset link...</p>
              </div>
            ) : (
              <>
                <h1 className="mb-1 text-center text-2xl font-bold text-white">Set New Password</h1>
                <p className="mb-7 text-center text-[13px] text-white/35">Choose a strong password for your account</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400/80">
                      New Password
                    </label>
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
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400/80">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3">
                      <svg className="h-4 w-4 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <p className="text-[12px] font-medium text-red-400">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] disabled:opacity-50"
                  >
                    <span className="relative z-10">{loading ? "Updating..." : "Update Password"}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </form>
              </>
            )}
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
            <Link href="/account/login" className="text-[11px] text-white/20 transition-colors hover:text-white/40">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
