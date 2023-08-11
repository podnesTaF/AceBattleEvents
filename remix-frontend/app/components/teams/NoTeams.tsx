import { Link } from "@remix-run/react";

const NoTeams = ({ url }: { url: string | null }) => {
  return (
    <div className="max-w-3xl mx-4 md:mx-auto my-10 rounded-md shadow-md flex flex-col justify-center items-center py-5 bg-white/50">
      <div className="text-center font-semibold">
        <h4 className="text-xl lg:text-2xl mb-4">
          It seems you haven&apos;t added your teams to the system yet.
        </h4>
        <h2 className="text-2xl lg:text-3xl mb-6">Maybe add one?</h2>
      </div>
      <button className="hover:bg-red-400 bg-red-500 text-white text-2xl font-semibold py-2 px-4 border border-red-500 rounded w-64 uppercase">
        <Link to={"/add-team?back=" + url}>Add team</Link>
      </button>
    </div>
  );
};

export default NoTeams;
