import { Outlet, V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Close Events" }];
};

const CloseEvents = () => {
  return (
    <>
      <header className="w-full flex justify-end md:justify-center h-56 md:h-[500px] bg-[url('/close_events.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="h-2/5 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="uppercase font-semibold text-2xl sm:text-3xl md:text-5xl">
            Upcoming <br />
            Events
          </h2>
        </div>
      </header>
      <main className="max-w-7xl my-5 md:my-8 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default CloseEvents;
