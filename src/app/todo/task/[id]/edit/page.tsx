import AddTaskForm from "@/components/AddTaskForm";
import { updateTask } from "@/utils/actions";
import prisma from "@/utils/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditTaskPageProps {
  params: { id: string };
}

const EditTaskPage = async ({ params }: EditTaskPageProps) => {
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!task) notFound();
  return (
    <section className="fix-height flex flex-col items-center justify-center ">
      <Link href={`/todo/task/${task.id}`} className="underline block mb-2">
        {"<< "} Back to task details
      </Link>
      <div className="w-2/3 max-w-full rounded-md p-5 bg-slate-800 border-gray-300">
        <h1 className="mb-7 font-bold text-3xl text-gray-100">
          Edit Your Yask
        </h1>
        <form action={updateTask} className="flex flex-col gap-6">
          <input type="hidden" name="id" defaultValue={task.id} />
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="p-2 text-xl rounded-md text-gray-950"
            defaultValue={task.title}
          />

          <select
            name="stauts"
            defaultValue={task.stauts}
            className="p-2 text-xl rounded-md text-gray-950"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          <textarea
            name="description"
            rows={5}
            className="p-2 text-xl rounded-md text-gray-950"
            placeholder="Task Description"
            defaultValue={task.description}
          ></textarea>

          <button
            type="submit"
            className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
          >
            Edit Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditTaskPage;
