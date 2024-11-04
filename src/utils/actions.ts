"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import { CreateTaskDto } from "./dtos";

// Server Action ==> Create Task
export async function createTask({ title, description }: CreateTaskDto) {
  if (typeof title !== "string" || title.length < 2) return;
  if (typeof description !== "string" || description.length < 4) return;

  await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  revalidatePath("/todo");
  redirect("/todo");
}
