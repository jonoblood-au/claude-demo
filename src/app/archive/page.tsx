import { getPostsByDate } from "@/lib/calendar";
import { Calendar } from "@/components/Calendar";

export const metadata = {
  title: "Archive",
  description: "Browse AI Blog posts by date.",
};

export default function ArchivePage() {
  const entries = getPostsByDate();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Archive</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Highlighted days have a published post — click one to read it.
      </p>

      <div className="mt-10 max-w-md">
        <Calendar entries={entries} />
      </div>
    </main>
  );
}
