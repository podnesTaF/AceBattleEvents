import { Outlet } from "@remix-run/react";

const AuthLayout = () => {
  return (
    <div className="w-full bg-[url('/wallpapers-abm.png')] bg-no-repeat bg-cover min-h-[700px] py-[5%] flex items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
