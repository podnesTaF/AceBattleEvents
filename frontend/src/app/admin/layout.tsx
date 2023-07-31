"use client";

import SideBar from "@/components/admin/SideBar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen relative">
      <SideBar />
      {children}
    </div>
  );
};

export default AdminLayout;
