import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchema";
import { Comment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method GET
 * @route ~/api/comments
 * @description Get All Comments
 * @access private (only admin)
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false)
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );

    const comments: Comment[] = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/comments
 * @description Create New Comment
 * @access private (only logged in user)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user)
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      );

    const body = (await request.json()) as CreateCommentDto;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );

    const newComment: Comment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
