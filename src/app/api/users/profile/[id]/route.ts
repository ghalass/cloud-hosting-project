import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchema";

interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @route ~/api/users/profil/:id
 * @desc Delete Profile
 * @access private (only user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });

    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      // deleting the user
      await prisma.user.delete({ where: { id: parseInt(params.id) } });

      // deleting the comments that belong to this user
      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({
        where: { id: { in: commentIds } },
      });

      return NextResponse.json(
        { message: "Your profile (account) has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Only uer himself can delete his profile, forbidden" },
      { status: 403 } // forbidden
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET
/**
 * @method GET
 * @route ~/api/users/profil/:id
 * @desc Get Profile By Id
 * @access private (only user himself can get his account)
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id)
      return NextResponse.json(
        { message: "your are not allowed, access denid" },
        { status: 403 }
      );
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT
/**
 * @method PUT
 * @route ~/api/users/profil/:id
 * @desc Update Profile By Id
 * @access private (only user himself can update his account)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id)
      return NextResponse.json(
        { message: "your are not allowed, access denid" },
        { status: 403 }
      );

    const body = (await request.json()) as UpdateUserDto;
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );

    if (body.password) {
      if (body.password.length < 6)
        return NextResponse.json(
          { message: "Password should be minimum 6 caracters" },
          { status: 400 }
        );
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    const { password, ...other } = updatedUser;
    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
