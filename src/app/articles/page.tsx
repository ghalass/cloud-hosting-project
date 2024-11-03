import { getArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Cloud Hosting Project",
  authors: [{ name: "Ghalass" }],
};

interface ArticlesPageProps {
  searchParams: { pageNumber: string };
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { pageNumber } = searchParams;
  // delay 3s
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="container m-auto px-5 ">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/articles"
        pages={pages}
      />
    </section>
  );
};

export default ArticlesPage;
