import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";

/**
 * @method POST
 * @route ~/api/users/register
 * @description Create New User
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    const validation = registerSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user)
      return NextResponse.json(
        { message: "This user already registred" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser: User = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    // --> generate JWT Token
    const jwtPayload: JWTPayload = {
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    };
    const token = generateJWT(jwtPayload);

    return NextResponse.json({ ...newUser, token }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
