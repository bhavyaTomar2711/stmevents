"use client";

import { useEffect } from "react";

export default function PreviewMessageListener() {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "scrollToSection") {
        const anchor = event.data.anchor;
        if (anchor === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return null;
}
