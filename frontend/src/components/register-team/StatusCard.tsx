import Image from "next/image";
import Link from "next/link";

interface StatusCardProps {
  status: string;
  eventId: string;
  setStatus: Function;
}

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  eventId,
  setStatus,
}) => {
  return (
    <div className="w-full min-h-[60vh] relative">
      <Image
        src={"/running.svg"}
        width={400}
        height={450}
        alt="running group"
        className="absolute bottom-10 left-10 -z-10 max-w-[300px] sm:max-w-none"
      />
      <h3 className="text-3xl md:text-4xl font-semibold mt-5 text-center uppercase">
        {status}
      </h3>
      <div className="max-w-3xl mx-4 md:mx-auto my-10 rounded-md shadow-md flex flex-col justify-around items-center py-5 bg-white/50 min-h-[300px]">
        <div className="text-center font-semibold">
          <h4 className="text-xl lg:text-2xl mb-6">
            {status === "success"
              ? "You have successfully registered for the event"
              : "You have not registered for the event, please try again"}
          </h4>
        </div>
        <div className="w-full flex justify-around">
          {status === "success" ? (
            <>
              <button className="hover:bg-w-gray-100 bg-white shadow-sm text-xl font-semibold py-2 px-4 border border-red-500 w-2/5 rounded uppercase">
                <Link href={"/calendar/" + eventId}>Back to event</Link>
              </button>
              <button className="hover:bg-red-400 bg-red-500 text-white text-xl font-semibold py-2 px-4 border border-red-500 w-2/5  rounded uppercase">
                <Link href={"/profile"}>Check your registrations</Link>
              </button>
            </>
          ) : (
            <button
              onClick={() => setStatus("")}
              className="hover:bg-red-400 bg-red-500 text-white text-xl font-semibold py-2 px-4 border border-red-500 w-2/5  rounded uppercase"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
