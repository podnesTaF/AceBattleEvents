import { Link } from "@remix-run/react";

const AnnonceStripe = () => {
  return (
    <div className="flex py-2 px-4 bg-white z-20 justify-end">
      <h4 className="uppercase font-semibold pr-2 text-lg md:text-xl border-r-[1px] border-black mr-2">
        Brussels mile <span className="lowercase">23 sep 2023</span>
      </h4>
      <Link to={"/results/25"}>
        <h4 className="text-green-500 uppercase font-semibold pr-2 text-lg md:text-xl">
          Results
        </h4>
      </Link>
    </div>
  );
};

export default AnnonceStripe;
