import Image from "next/image";
import Link from "next/link";

interface StatusCardProps {
  status: string;
  eventId: string;
  userId: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, eventId, userId }) => {
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
        Success!
      </h3>
      <div className="max-w-3xl mx-4 md:mx-auto my-10 rounded-md shadow-md flex flex-col justify-around items-center py-5 bg-white/50 min-h-[300px]">
        <div className="text-center font-semibold">
          <h4 className="text-xl lg:text-2xl mb-6">
            You successfully registered your team “Brussels” to “Battle mile cup
            Benelux”.
          </h4>
        </div>
        <div className="w-full flex justify-around">
          <button className="hover:bg-w-gray-100 bg-white shadow-sm text-xl font-semibold py-2 px-4 border border-red-500 w-2/5 rounded uppercase">
            <Link href={"/calendar/" + eventId}>Back to event</Link>
          </button>
          <button className="hover:bg-red-400 bg-red-500 text-white text-xl font-semibold py-2 px-4 border border-red-500 w-2/5  rounded uppercase">
            <Link href={"/profile/" + userId}>Check your registrations</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
