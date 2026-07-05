"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CalendarEntry } from "@/lib/calendar";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const FALLBACK_YEAR = 2026;
const FALLBACK_MONTH = 0;

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function Calendar({ entries }: { entries: CalendarEntry[] }) {
  const entriesByDate = useMemo(() => {
    const map = new Map<string, CalendarEntry>();
    for (const entry of entries) {
      map.set(entry.date, entry);
    }
    return map;
  }, [entries]);

  const initial = useMemo(() => {
    if (entries.length === 0) {
      return { year: FALLBACK_YEAR, month: FALLBACK_MONTH };
    }
    const mostRecent = entries[entries.length - 1].date;
    const [year, month] = mostRecent.split("-").map(Number);
    return { year, month: month - 1 };
  }, [entries]);

  const [viewedYear, setViewedYear] = useState(initial.year);
  const [viewedMonth, setViewedMonth] = useState(initial.month);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    // "Today" must be read client-side only: this page is statically
    // generated at build time, so baking today's date into the prerendered
    // HTML would go stale immediately.
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(toDateKey(now.getFullYear(), now.getMonth(), now.getDate()));
  }, []);

  function goToPreviousMonth() {
    if (viewedMonth === 0) {
      setViewedYear((y) => y - 1);
      setViewedMonth(11);
    } else {
      setViewedMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (viewedMonth === 11) {
      setViewedYear((y) => y + 1);
      setViewedMonth(0);
    } else {
      setViewedMonth((m) => m + 1);
    }
  }

  const firstWeekday = new Date(viewedYear, viewedMonth, 1).getDay();
  const daysInMonth = new Date(viewedYear, viewedMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
          className="rounded-md p-2 text-zinc-600 hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.06]"
        >
          ←
        </button>
        <h2 className="text-lg font-medium tracking-tight">
          {MONTH_NAMES[viewedMonth]} {viewedYear}
        </h2>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
          className="rounded-md p-2 text-zinc-600 hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.06]"
        >
          →
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {WEEKDAY_NAMES.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const dateKey = toDateKey(viewedYear, viewedMonth, day);
          const entry = entriesByDate.get(dateKey);
          const isToday = dateKey === today;

          const baseClasses =
            "flex aspect-square items-center justify-center rounded-md text-sm";
          const todayRing = isToday ? "ring-1 ring-inset ring-accent" : "";

          if (!entry) {
            return (
              <div
                key={dateKey}
                className={`${baseClasses} ${todayRing} text-zinc-400 dark:text-zinc-600`}
              >
                {day}
              </div>
            );
          }

          const href = entry.posts.length === 1 ? `/posts/${entry.posts[0].slug}` : `/archive/${entry.date}`;

          return (
            <Link
              key={dateKey}
              href={href}
              title={entry.posts.map((p) => p.title).join(", ")}
              className={`${baseClasses} ${todayRing} relative bg-gradient-to-br from-accent to-accent-secondary font-medium text-white transition-opacity hover:opacity-80`}
            >
              {day}
              {entry.posts.length > 1 && (
                <span className="absolute -bottom-1 -right-1 rounded-full bg-zinc-900 px-1 text-[10px] leading-tight text-white dark:bg-zinc-100 dark:text-zinc-900">
                  +{entry.posts.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
