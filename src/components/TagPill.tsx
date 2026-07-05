import Link from "next/link";
import { TAG_LABELS, TAG_STYLES, type Tag } from "@/config/tags";

export function TagPill({ tag }: { tag: Tag }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${TAG_STYLES[tag]}`}
    >
      {TAG_LABELS[tag]}
    </Link>
  );
}
