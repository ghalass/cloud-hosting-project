import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@/utils/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Cloud Hosting Project",
  authors: [{ name: "Ghalass" }],
};

const ArticlesPage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Failled to fetch articles");
  const articles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5 ">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlesPage;
