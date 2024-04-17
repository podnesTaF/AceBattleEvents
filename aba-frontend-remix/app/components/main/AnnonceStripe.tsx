import { Link } from "@remix-run/react";
import { IFutureEvent } from "~/lib/types";
import { formatDate } from "~/lib/utils";

const AnnonceStripe = ({ eventPreview }: { eventPreview: IFutureEvent }) => {
  return (
    <div className="flex items-center py-2 px-4 bg-white z-20 justify-end">
      <h4 className="font-semibold pr-2 text-md sm:text-lg md:text-xl border-r-[1px] border-black mr-2">
        {eventPreview.title}{" "}
        <span className="capitalize text-red-400">
          {formatDate(eventPreview.date, false)}
        </span>
      </h4>
      <Link to={"/events/" + eventPreview.event?.eventCode}>
        <h4 className="text-green-500 font-semibold text-md sm:text-lg md:text-xl">
          View Event
        </h4>
      </Link>
    </div>
  );
};

export default AnnonceStripe;
