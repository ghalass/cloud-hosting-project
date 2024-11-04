"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import { CreateTaskDto } from "./dtos";

// Server Action ==> Create Task
export async function createTask({ title, description }: CreateTaskDto) {
  if (typeof title !== "string" || title.length < 2) return;
  if (typeof description !== "string" || description.length < 4) return;

  try {
    await prisma.task.create({
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    throw new Error("could not create the task, please try again");
  }
  revalidatePath("/todo");
  redirect("/todo");
}

// Server Action ==> Delete Task
export async function deleteTask(id: number) {
  // const id = formData.get("id")?.toString();
  if (!id) return;
  try {
    await prisma.task.delete({ where: { id: id } });
  } catch (error) {
    throw new Error("could not create the task, please try again");
  }
  revalidatePath("/todo");
  redirect("/todo");
}
