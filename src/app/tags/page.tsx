import { getAllTagSlugs, getPostsByTag } from "@/lib/tags";
import { TagPill } from "@/components/TagPill";

export const metadata = {
  title: "Tags",
  description: "Browse AI Blog posts by theme.",
};

export default function TagsPage() {
  const tags = getAllTagSlugs();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Tags</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browse posts by theme.
      </p>

      <ul className="mt-10 flex flex-wrap gap-3">
        {tags.map((tag) => {
          const count = getPostsByTag(tag).length;
          return (
            <li key={tag} className="flex items-center gap-2">
              <TagPill tag={tag} />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">({count})</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
