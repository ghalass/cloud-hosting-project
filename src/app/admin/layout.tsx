import { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Cloud Hosting Project",
  authors: [{ name: "Ghalass" }],
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}
const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full lg:w-4/5 overflow-scroll">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
