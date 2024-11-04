import Link from "next/link";

const TodoPage = () => {
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
    </section>
  );
};

export default TodoPage;
