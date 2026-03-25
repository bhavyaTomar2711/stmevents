"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account/login");
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#07070d]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
    </div>
  );
}
