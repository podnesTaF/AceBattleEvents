import React from "react";

interface Props {
  title: string;
}

const CreatePagesTitle: React.FC<Props> = ({ title }) => {
  return (
    <header className="w-full flex justify-center items-center h-48 sm:h-56 bg-[url('/add-team-sm.jpg')] md:bg-[url('/add-team.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
      <h2 className="text-white text-3xl uppercase font-semibold z-10">
        {title}
      </h2>
    </header>
  );
};

export default CreatePagesTitle;
