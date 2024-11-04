"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import { CreateTaskDto } from "./dtos";
import { Status } from "@prisma/client";

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

// Server Action ==> Delete Task
export async function updateTask(formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const stauts = formData.get("stauts") as Status;
  const id = formData.get("id")?.toString();

  if (typeof title !== "string" || title.length < 2) return;
  if (typeof description !== "string" || description.length < 4) return;
  if (!stauts) return;
  if (typeof id !== "string") return;

  try {
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, stauts },
    });
  } catch (error: any) {
    // throw new Error("could not update the task, please try again");
    throw new Error(error);
  }
  revalidatePath("/todo");
  redirect(`/todo/task/${id}`);
}
