import { Article } from "./types";
import { getTitle } from "@progfay/scrapbox-parser";

export function parseScrapbox(src: string): Article {
  return {
    title: getTitle(src),
    description: null,
    toc: [],
    heading: '',
    content: '',
    links: [],
  };
}
