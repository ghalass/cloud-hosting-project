import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@/utils/types";
import React from "react";

interface SingleArticlePageProps {
  params: { id: number };
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!response.ok) throw new Error("Failled to fetch articles");
  const article: Article = await response.json();

  return (
    <section className="fix-height container m-auto px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-800">1/1/2024</div>
        <p className="text-gray-800 text-xl mt-5">{article.body}</p>
      </div>
    </section>
  );
};

export default SingleArticlePage;
