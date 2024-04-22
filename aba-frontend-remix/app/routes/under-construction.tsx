import { useNavigate } from "@remix-run/react";
import EventButton from "~/components/events/EventButton";

const PageInDevelopment = () => {
  const navigate = useNavigate();
  return (
    <header
      className={`w-full relative flex items-center py-[20%] lg:py-[10%] min-h-screen`}
    >
      <img
        src="/acebattlemile.svg"
        alt="logo"
        className="absolute top-10 left-[5%] w-32 xs:w-60 lg:w-96 h-auto"
      />
      <img
        src={
          "https://storage.googleapis.com/abe_cloud_storage/events%2Fcyprus_mainimg.jpg"
        }
        alt="intro image"
        className="w-full h-full absolute left-0 top-0 object-cover -z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2px] bg-[#1E1C1F]/60 -z-10"></div>
      <div className="flex flex-col z-10 px-[5%]">
        <h2 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none mb-3 md:mb-5 xl:mb-6 max-w-full xs:max-w-[95%] sm:max-w-[80%] md:max-w-[60%] 2xl:max-w-5xl">
          Our website is under construction
        </h2>
        <h4 className="text-white font-semibold uppercase text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl mb-1 sm:mb-2 lg:mb-4">
          We are working hard to give you the best experience.
        </h4>
      </div>
      <EventButton
        onClick={() => navigate("/auth/login")}
        className="w-fit md:!px-5 md:!py-3 !absolute bottom-[5%] left-[5%]"
        color="red"
      >
        login as admin
      </EventButton>
    </header>
  );
};

export default PageInDevelopment;
