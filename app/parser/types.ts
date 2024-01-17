export type Heading = { id: string; title: string; children: Heading[] };
export type Toc = Heading[];
export interface Article {
  title: string;
  description: string | null;
  toc: Toc;
  heading: string;
  content: string;
  links: string[];
}