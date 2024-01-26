export const Syntax = {
  Markdown: "Markdown",
} as const;
export const Syntaxes = [Syntax.Markdown] as const;
export type Syntax = (typeof Syntax)[keyof typeof Syntax];
