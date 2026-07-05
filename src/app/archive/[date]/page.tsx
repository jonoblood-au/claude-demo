import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByDate } from "@/lib/calendar";

export function generateStaticParams() {
  return getPostsByDate()
    .filter((entry) => entry.posts.length > 1)
    .map((entry) => ({ date: entry.date }));
}

export default async function ArchiveDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const entry = getPostsByDate().find((e) => e.date === date && e.posts.length > 1);

  if (!entry) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link href="/archive" className="text-sm text-zinc-500 hover:underline dark:text-zinc-400">
        ← Back to archive
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Posts from{" "}
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>

      <ul className="mt-10 flex flex-col gap-6">
        {entry.posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-xl font-medium tracking-tight hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
