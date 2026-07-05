# AI Blog

A blog about artificial intelligence, built with [Next.js](https://nextjs.org). Posts are plain Markdown files with frontmatter, rendered statically at build time.

## Features

- Posts as Markdown files in `content/posts`, with `title`, `date`, `excerpt`, and `tags` frontmatter
- Manual dark/light theme toggle, persisted across visits
- Fixed tag taxonomy with per-tag listing pages (`/tags`)
- Month-grid calendar archive of posts by date (`/archive`)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To add a post, create a new Markdown file in `content/posts` following the format of the existing examples.

## Testing

`tests/smoke.py` is an end-to-end smoke test (theme toggle persistence, tag filtering, calendar archive navigation) using Playwright via the `webapp-testing` skill's server helper. One-time setup:

```bash
python3 -m venv .venv
.venv/bin/pip install playwright
.venv/bin/playwright install chromium
```

Then run it with:

```bash
npm run test:e2e
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
