import Link from "next/link";

const AnnonceStripe = () => {
  return (
    <div className="flex py-2 px-4 bg-white z-20">
      <h4 className="uppercase font-semibold border-r-[1px] pr-2 mr-2 text-xl border-black">
        Ace Battle Mile
      </h4>
      <Link href="/calendar/1">
        <h4 className="text-red-500 uppercase font-semibold pr-2 text-xl">
          mice of brussels <span className="lowercase">03 sep 2023</span>
        </h4>
      </Link>
    </div>
  );
};

export default AnnonceStripe;
