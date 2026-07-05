export const TAGS = ["llms", "agents", "ethics", "tooling"] as const;

export type Tag = (typeof TAGS)[number];

export const TAG_LABELS: Record<Tag, string> = {
  llms: "LLMs",
  agents: "Agents",
  ethics: "Ethics",
  tooling: "Tooling",
};
