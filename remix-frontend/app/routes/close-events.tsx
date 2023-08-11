import { Outlet } from "@remix-run/react";

const CloseEvents = () => {
  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[800px] bg-[url('/close_events.jpg')] bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="uppercase font-semibold text-3xl sm:text-5xl">
            CLOSE <br />
            EVENTS
          </h2>
        </div>
        <div className="absolute w-full sm:w-1/2 md:w-[400px] h-1/5 sm:h-1/5 bg-black bottom-0 right-0 flex justify-center items-center">
          <h3 className="uppercase text-xl font-thin text-white w-4/5">
            ExPLORE THE CLOSEST EVENTS. READ ABOUT STARTS
          </h3>
        </div>
      </header>
      <main className="max-w-7xl my-5 md:my-8 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default CloseEvents;
