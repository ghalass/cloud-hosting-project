import { articles } from "@/utils/data";
import { CreateArticleDto } from "@/utils/dtos";
import { Article } from "@/utils/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles
 * @description Get All Articles
 * @access public
 */
export function GET() {
  return NextResponse.json(articles, { status: 200 });
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create New Article
 * @access public
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateArticleDto;

  const validation = createArticleSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );

  const newArticle: Article = {
    title: body.body,
    body: body.body,
    id: articles.length + 1,
    userId: 200,
  };
  articles.push(newArticle);
  return NextResponse.json(newArticle, { status: 201 });
}
