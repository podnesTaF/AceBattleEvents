import { Skeleton } from "@mui/material";

const EventSkeleton = () => {
  return (
    <div className="my-10">
      <Skeleton variant="text" width={300} height={40} animation="wave" />
      <div className="flex justify-between w-full lg:w-[820px] mx-auto my-3 font-semibold text-xl">
        <Skeleton variant="text" width={100} height={20} animation="wave" />
        <Skeleton variant="text" width={150} height={20} animation="wave" />
        <Skeleton variant="text" width={200} height={20} animation="wave" />
      </div>
      <div className="w-full bg-contain md:bg-cover bg-no-repeat relative flex justify-center drop-shadow-xl">
        <div className="md:bg-[#F7F7F7] px-5 md:py-5 w-full lg:w-[820px]">
          <Skeleton variant="text" width={200} height={30} animation="wave" />
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2 border-red border-[1px] p-4 flex flex-col gap-2 bg-white min-h-[400px] justify-between">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="text"
                  width={index % 2 === 0 ? 150 : 100}
                  height={20}
                  animation="wave"
                />
              ))}
            </div>
            <div className="w-full md:w-1/2 border-red border-[1px] p-4 bg-[#1E1C1F] flex flex-col items-center min-h-[300px] sm:min-h-[400px]">
              <Skeleton
                variant="text"
                width={150}
                height={30}
                animation="wave"
              />
              <div className="flex-1 flex items-center justify-center">
                <Skeleton
                  variant="text"
                  width={200}
                  height={60}
                  animation="wave"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around my-4 gap-3">
            <Skeleton
              variant="rectangular"
              width={200}
              height={40}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={200}
              height={40}
              animation="wave"
            />
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-100"></div>
    </div>
  );
};

export default EventSkeleton;
