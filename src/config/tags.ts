export const TAGS = ["llms", "agents", "ethics", "tooling"] as const;

export type Tag = (typeof TAGS)[number];

export const TAG_LABELS: Record<Tag, string> = {
  llms: "LLMs",
  agents: "Agents",
  ethics: "Ethics",
  tooling: "Tooling",
};

// A single style shared by every tag: color here doesn't encode a real
// per-topic taxonomy, so it shouldn't invent one. It's tinted with the
// site's own accent instead of an arbitrary per-tag hue, keeping the tag
// pills, the calendar highlight, and the hero on one consistent palette.
export const TAG_PILL_STYLE =
  "border-accent/30 bg-accent/10 text-accent hover:bg-accent/20";
