import { Article } from "@prisma/client";

// get articles bases on pageNumber
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article> {
  const response = await fetch(
    `http://localhost:3000/api/articles?pageNumber=${pageNumber}`
  );
  if (!response.ok) throw new Error("Failled to fetch articles");
  return response.json();
}

// get articles count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`http://localhost:3000/api/articles/count`);
  if (!response.ok) throw new Error("Failled to get articles count");
  const { count } = (await response.json()) as { count: number };
  return count;
}

// get articles bases on searchText
export async function getArticlesBasedOnSearch(
  searchText: string | undefined
): Promise<Article> {
  const response = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchText}`
  );
  if (!response.ok) throw new Error("Failled to fetch articles");
  return response.json();
}
