import { articles } from "@/utils/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles
 * @description Get All Articles
 * @access public
 */
export function GET(request: NextRequest) {
  return NextResponse.json(articles, { status: 200 });
}
