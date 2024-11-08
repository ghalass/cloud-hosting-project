import StatusBadge from "@/components/StatusBadge";
import prisma from "@/utils/db";
import Link from "next/link";

const TodoPage = async () => {
  const tasks = await prisma.task.findMany();
  return (
    <section className="fix-height">
      <h1 className="text-4xl font-semibold">Tasks List App</h1>
      <div className="flex items-center justify-end mb-20">
        <Link
          href={"/todo/task/add"}
          className="bg-cyan-300 hover:bg-cyan-400 transition-colors text-black py-1 px-2 text-xl font-semibold rounded-sm"
        >
          Add Task
        </Link>
      </div>
      <table className="table w-full text-left mt-5">
        <thead className="border-t-2 border-b-2 border-gray-300 text-xl">
          <tr>
            <th className="p-3">#</th>
            <th>Task Title</th>
            <th>Task Status</th>
            <th>Task Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className="border-b border-gray-500">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{task.title}</td>
              <td className="p-3">
                <StatusBadge status={task.stauts} />
              </td>
              <td className="p-3">
                <Link
                  className="bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-md p-2"
                  href={`/todo/task/${task.id}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TodoPage;
