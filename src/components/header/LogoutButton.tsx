"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 text-gray-200 px-1 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
