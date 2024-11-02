import prisma from "@/utils/db";
import { LoginrUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @method POST
 * @route ~/api/users/login
 * @description Login User
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginrUserDto;

    const validation = loginSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user)
      return NextResponse.json(
        { message: "Email or Password Invalid" },
        { status: 400 }
      );

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordMatch)
      return NextResponse.json(
        { message: "Email or Password Invalid" },
        { status: 400 }
      );

    //@Todo --> generate JWT Token
    const token = null;

    return NextResponse.json(
      { message: "Authenticated", token },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
