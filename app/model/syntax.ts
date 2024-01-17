export const Syntax = {
  Markdown: "Markdown",
  Scrapbox: "Scrapbox",
} as const;
export const Syntaxes = [Syntax.Markdown, Syntax.Scrapbox] as const;
export type Syntax = (typeof Syntax)[keyof typeof Syntax];
