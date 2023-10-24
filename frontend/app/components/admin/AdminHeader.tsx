import React from "react";
import { SearchField } from "..";

interface Props {
  title: string;
  pageName: string;
  description?: string;
  searchValue?: string;
  onChangeInput?: Function;
  children?: React.ReactNode;
}

const AdminHeader: React.FC<Props> = ({
  title,
  description,
  searchValue,
  onChangeInput,
  children,
  pageName,
}) => {
  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            {title}
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            {pageName}
          </h3>
        </div>
      </header>
      <main className="w-full">
        <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center bg-[#1E1C1F] p-4">
          <h2 className="text-white text-3xl font-semibold">{description}</h2>
          {onChangeInput && (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <SearchField
                onChangeInput={onChangeInput}
                value={searchValue || ""}
              />
            </div>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminHeader;
