import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { TAGS, type Tag } from "@/config/tags";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: Tag[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function parseTags(raw: unknown, slug: string): Tag[] {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    throw new Error(`Post "${slug}": \`tags\` frontmatter must be an array of strings.`);
  }
  return raw.map((t) => {
    if (typeof t !== "string" || !(TAGS as readonly string[]).includes(t)) {
      throw new Error(
        `Post "${slug}" references unknown tag "${t}". Valid tags: ${TAGS.join(", ")}. ` +
          `Add it to src/config/tags.ts if this is an intentional new tag.`
      );
    }
    return t as Tag;
  });
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      tags: parseTags(data.tags, slug),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: parseTags(data.tags, slug),
    contentHtml,
  };
}
