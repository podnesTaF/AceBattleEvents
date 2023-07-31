import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            Events
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            Admin dashboard
          </h3>
        </div>
      </header>
      <main className="w-full">{children}</main>
    </div>
  );
};

export default layout;
