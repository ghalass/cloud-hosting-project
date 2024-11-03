import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method GET
 * @route ~/api/users/logout
 * @description Logout User
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    console.log(request);
    cookies().delete("jwtToken");
    return NextResponse.json({ message: "Logout" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
