export const TAGS = ["llms", "agents", "ethics", "tooling"] as const;

export type Tag = (typeof TAGS)[number];

export const TAG_LABELS: Record<Tag, string> = {
  llms: "LLMs",
  agents: "Agents",
  ethics: "Ethics",
  tooling: "Tooling",
};

export const TAG_STYLES: Record<Tag, string> = {
  llms: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300 dark:hover:bg-indigo-400/20",
  agents:
    "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:hover:bg-fuchsia-400/20",
  ethics:
    "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/20",
  tooling:
    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20",
};
