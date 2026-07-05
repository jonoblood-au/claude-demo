import { getAllPosts, type PostMeta } from "@/lib/posts";
import { TAGS, type Tag } from "@/config/tags";

export function getAllTagSlugs(): Tag[] {
  return [...TAGS];
}

export function getPostsByTag(tag: Tag): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
