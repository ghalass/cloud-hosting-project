import { UpdateCommentDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: { id: string };
}

/**
 * @method GET
 * @route ~/api/comments/:id
 * @desc Get Single Comment By Id
 * @access public
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment)
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update Comment
 * @access private (only owner of the comment)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment)
      return NextResponse.json(
        { message: "your are not allowed, access denied" },
        { status: 403 }
      );

    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId)
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );

    const body = (await request.json()) as UpdateCommentDto;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc Delete Comment
 * @access private (only admin or owner of the comment)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment)
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );

    const user = verifyToken(request);
    if (user === null)
      return NextResponse.json(
        { message: "not token provided, access denied" },
        { status: 401 }
      );

    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({ message: "comment deleted" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "your are not allowed, access denied" },
      { status: 403 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
