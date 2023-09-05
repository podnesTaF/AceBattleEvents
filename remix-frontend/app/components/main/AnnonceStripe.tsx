import { Link } from "@remix-run/react";

const AnnonceStripe = () => {
  return (
    <div className="flex py-2 px-4 bg-white z-20">
      <h4 className="uppercase font-semibold border-r-[1px] pr-2 mr-2 text-xl border-black">
        Ace Battle Mile
      </h4>
      <Link to={"/events/25"}>
        <h4 className="text-green-500 uppercase font-semibold pr-2 text-xl">
          mice of brussels <span className="lowercase">23 sep 2023</span>
        </h4>
      </Link>
    </div>
  );
};

export default AnnonceStripe;
