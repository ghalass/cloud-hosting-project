import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 * @method GET
 * @route ~/api/articles/count
 * @description Get Articles count
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
