import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(jwtPayload: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET;
  const token = jwt.sign(jwtPayload, privateKey as string, {
    expiresIn: "30d",
  });
  return token;
}
