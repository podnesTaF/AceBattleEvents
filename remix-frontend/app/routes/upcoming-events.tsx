import { Outlet, V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Close Events" }];
};

const CloseEvents = () => {
  return (
    <>
      <header className="w-full flex justify-center h-96 sm:h-[640px] bg-[url('/close_events.jpg')] bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <div className="h-3/5 mb-10 sm:mb-0 sm:h-1/2 bg-[#FCEF3C] flex justify-center items-center w-3/4 sm:w-3/5 md:w-[500px]">
          <h2 className="uppercase font-semibold text-3xl sm:text-5xl">
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
