import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

// Server Action
async function createTask(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();

  if (!title || !description) return console.log("Required");

  await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  revalidatePath("/todo");
  redirect("/todo");
}

const AddTaskPage = () => {
  return (
    <section className="fix-height flex flex-col items-center justify-center ">
      <Link href="" className="underline block mb-2">
        {"<< "} Back to tasks table
      </Link>
      <div className="w-2/3 max-w-full rounded-md p-5 bg-slate-800 border-gray-300">
        <h1 className="mb-7 font-bold text-3xl text-gray-100">Add Your Yask</h1>
        <form action={createTask} className="flex flex-col gap-6">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="p-2 text-xl rounded-md text-gray-950"
          />
          <textarea
            name="description"
            rows={5}
            className="p-2 text-xl rounded-md text-gray-950"
            placeholder="Task Description"
          ></textarea>
          <button
            type="submit"
            className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTaskPage;
