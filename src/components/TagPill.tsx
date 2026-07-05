import Link from "next/link";
import { TAG_LABELS, type Tag } from "@/config/tags";

export function TagPill({ tag }: { tag: Tag }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-flex items-center rounded-full border border-black/[.08] px-3 py-1 text-xs text-zinc-600 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-white/[.06]"
    >
      {TAG_LABELS[tag]}
    </Link>
  );
}
