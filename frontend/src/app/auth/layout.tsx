import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center relative h-40 md:h-60 bg-[url('/auth-intro.jpg')] bg-cover bg-center">
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
        <h2 className="text-2xl md:text-4xl text-white z-10">Sign up</h2>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className="bg-red-700 absolute left-0 top-0 w-screen md:w-1/2 lg:w-1/3 h-full z-0"></div>
        <div className="p-10 z-10">
          <div className="flex justify-center max-w-6xl w-full bg-white shadow-xl rounded-sm">
            <div className="bg-[url('/auth-card.jpg')] w-96 hidden md:block bg-cover bg-center"></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
