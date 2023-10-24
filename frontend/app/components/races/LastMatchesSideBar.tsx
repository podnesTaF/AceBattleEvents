import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "@remix-run/react";
import React from "react";
import { IRace } from "~/lib/types";
import { formatDate, getBattle } from "~/lib/utils";

interface LastMatchesSideBarProps {
  matches: IRace[];
}

const LastMatchesSideBar: React.FC<LastMatchesSideBarProps> = ({ matches }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-semibold py-2 border-b-2 border-gray-300 mb-3">
        Last Matches
      </h3>
      <div className="flex w-full flex-col gap-4">
        {matches.length ? (
          matches.map((match) => (
            <div
              key={match.id}
              className="bg-white border-l-2 border-red-500 p-4"
            >
              <p className="font-semibold text-gray-400 mb-2 text-end">
                {formatDate(match.startTime, false)}
              </p>
              <div className="mb-4">
                <h3 className="text-xl uppercase font-semibold">
                  {match.event.title}
                </h3>
                <div className="flex gap-2 items-center">
                  <img
                    src={match.event.location.country.flagIconUrl}
                    alt="flag"
                    width={24}
                  />
                  <p className="text-gray-400 text-sm">
                    {match.event.location.city},{" "}
                    {match.event.location.country.name}
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-semibold mb-2">Teams:</h3>
                <h3 className="uppercase max-w-[250px]">{getBattle(match)}</h3>
              </div>
              <div className="flex w-full 2xl:w-[320px] justify-end">
                <Link
                  to={`/race/${match.id}`}
                  className="underline font-semibold text-blue-400"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border-l-2 border-red-500 p-4">
            <div className="flex gap-2  w-full 2xl:w-[320px]c">
              <InfoOutlinedIcon />
              <p className="font-semibold text-gray-400 mb-4 text-end text-xl">
                No matches found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LastMatchesSideBar;
