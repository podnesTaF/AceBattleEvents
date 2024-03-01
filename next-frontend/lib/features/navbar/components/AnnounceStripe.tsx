import Link from "next/link";

const AnnonceStripe = () => {
  return (
    <div className="flex py-2 px-4 bg-white z-20 justify-end">
      <h4 className="uppercase font-semibold pr-2 text-lg md:text-xl border-r-[1px] border-black mr-2">
        European Ace Battle 1 Mile Challenge{" "}
        <span className="lowercase">17-18 May 2024</span>
      </h4>
      <Link href={"/results/25"}>
        <h4 className="text-green-500 uppercase font-semibold pr-2 text-lg md:text-xl">
          View Details
        </h4>
      </Link>
    </div>
  );
};

export default AnnonceStripe;
