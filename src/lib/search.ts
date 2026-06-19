// eslint-disable-next-line @typescript-eslint/no-require-imports
const FlexSearch = require("flexsearch");
import { getAllArticles, Article } from "./articles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let searchIndex: any = null;
const articleMap: Map<number, Article> = new Map();

function buildIndex(): void {
  if (searchIndex) return;

  const articles = getAllArticles();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchIndex = new FlexSearch.Index({
    tokenize: "forward",
    charset: "latin:extra",
  });

  articles.forEach((article, idx) => {
    const doc = {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      tags: article.frontmatter.tags.join(" "),
      content: article.content.slice(0, 1000),
    };
    searchIndex.add(idx, JSON.stringify(doc));
    articleMap.set(idx, article);
  });
}

export function searchArticles(query: string): Article[] {
  buildIndex();
  if (!searchIndex || !query.trim()) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = searchIndex.search(query, { limit: 10 });
  return results
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((id: any) => articleMap.get(id as number)!)
    .filter(Boolean);
}
