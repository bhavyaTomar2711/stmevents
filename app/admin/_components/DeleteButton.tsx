"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteButton({ table, id }: { table: string; id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    const supabase = createClient();
    await supabase.from(table).delete().eq("id", id);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-500/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
    >
      Delete
    </button>
  );
}
