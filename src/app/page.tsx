import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { TagPill } from "@/components/TagPill";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">AI Blog</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Explainers and notes on artificial intelligence.
      </p>

      <ul className="mt-12 flex flex-col gap-10">
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
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
