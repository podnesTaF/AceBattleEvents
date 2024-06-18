import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { useFilter } from "~/lib/hooks";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = request.url;
  const params = url.split("?")[1];
  const currPage = new URL(url).searchParams.get("page") || "1";

  const racesData = await Api().races.getAllRaces(params);

  return json({
    racesData,
    currPage: parseInt(currPage),
  });
};

const RacesPage = () => {
  const { racesData, currPage } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const onChangePage = (pageNum: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", pageNum.toString());
    navigate(url.pathname + url.search);
  };
  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            Races
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            Admin dashboard
          </h3>
        </div>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RacesPage;
