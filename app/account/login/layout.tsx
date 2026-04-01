import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In | STM Events",
  description: "Sign in to your STM Events account.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
