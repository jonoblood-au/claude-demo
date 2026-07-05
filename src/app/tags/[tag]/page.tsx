import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTagSlugs, getPostsByTag } from "@/lib/tags";
import { TAG_LABELS, TAGS, type Tag } from "@/config/tags";

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

function isValidTag(tag: string): tag is Tag {
  return (TAGS as readonly string[]).includes(tag);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  if (!isValidTag(tag)) return {};
  return {
    title: `Posts tagged: ${TAG_LABELS[tag]}`,
    description: `AI Blog posts about ${TAG_LABELS[tag]}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  if (!isValidTag(tag)) notFound();

  const posts = getPostsByTag(tag);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/tags"
        className="text-sm text-zinc-500 transition-colors hover:text-accent dark:text-zinc-400 dark:hover:text-accent"
      >
        ← All tags
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Posts tagged: {TAG_LABELS[tag]}
      </h1>

      <ul className="mt-10 flex flex-col gap-10">
        {posts.length === 0 && (
          <p className="text-zinc-600 dark:text-zinc-400">No posts yet.</p>
        )}
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-xl font-medium tracking-tight hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
