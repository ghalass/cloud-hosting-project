import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";

// get all comments
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: { Cookie: `jwtToken=${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch comments");
  return await response.json();
}
