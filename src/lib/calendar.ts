import { getAllPosts, type PostMeta } from "@/lib/posts";

export interface CalendarEntry {
  date: string;
  posts: Pick<PostMeta, "slug" | "title">[];
}

export function getPostsByDate(): CalendarEntry[] {
  const byDate = new Map<string, Pick<PostMeta, "slug" | "title">[]>();

  for (const post of getAllPosts()) {
    const list = byDate.get(post.date) ?? [];
    list.push({ slug: post.slug, title: post.title });
    byDate.set(post.date, list);
  }

  return [...byDate.entries()]
    .map(([date, posts]) => ({ date, posts }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}
