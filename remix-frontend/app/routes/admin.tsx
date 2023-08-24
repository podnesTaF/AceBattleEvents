import { Outlet } from "@remix-run/react";
import { SideBar } from "~/components";

const AdminLayout = () => {
  return (
    <div className="flex w-full min-h-screen relative">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
