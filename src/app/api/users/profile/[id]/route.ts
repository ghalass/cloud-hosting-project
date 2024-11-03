import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/utils/types";

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
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });

    const authToken = request.headers.get("authToken") as string;

    // if (!authToken)
    //   return NextResponse.json(
    //     { message: "Not token provided, access denied" },
    //     { status: 401 } // Unauthorized
    //   );

    const userFromToken = jwt.verify(
      authToken,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    if (userFromToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
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
