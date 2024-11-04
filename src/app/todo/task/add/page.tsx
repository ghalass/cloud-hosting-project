import AddTaskForm from "@/components/AddTaskForm";
import Link from "next/link";

const AddTaskPage = () => {
  return (
    <section className="fix-height flex flex-col items-center justify-center ">
      <Link href="" className="underline block mb-2">
        {"<< "} Back to tasks table
      </Link>
      <div className="w-2/3 max-w-full rounded-md p-5 bg-slate-800 border-gray-300">
        <h1 className="mb-7 font-bold text-3xl text-gray-100">Add Your Yask</h1>
        <AddTaskForm />
      </div>
    </section>
  );
};

export default AddTaskPage;
