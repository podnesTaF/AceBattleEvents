import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import {
  ClubHeader,
  ClubInfo,
  ClubResultsFilter,
  CustomCarousel,
  CustomTable,
  FavoriteClubButton,
  JoinClubForm,
  MemberCarouseltem,
  NewsCard,
  Pagination,
} from "~/components";
import { authenticator, fakeNews, transformClubResults } from "~/lib/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { clubId } = params;
  const { url } = request;
  const resultPage = new URL(url).searchParams.get("resultPage") || "1";

  const user = await authenticator.isAuthenticated(request);

  const me = await Api(user?.token).users.getUser();

  if (!clubId) throw new Error("Club not found");

  const club = await Api().clubs.getClub(clubId);

  if (!club) throw new Error("Club not found");

  const clubResultsData = await Api().teams.getTeamResultsByClubId(club.id, +1);

  const resultsRows = transformClubResults(clubResultsData?.results || []);

  return json({
    club,
    user: me,
    resultsData: { ...clubResultsData, currPage: +resultPage },
    resultsRows,
  });
};

const ClubPage = () => {
  const { club, user, resultsData, resultsRows } =
    useLoaderData<typeof loader>();
  const [statusAlert, setStatusAlert] = useState({
    message: "",
    isOpen: false,
  });
  const [filters, setFilters] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const getFilters = (filters: any) => {
    setFilters(filters);
  };

  const createJoinRequest = async (
    motivation: string,
    clubId: number,
    checkValue: boolean
  ) => {
    try {
      if (!user) throw new Error("You must be logged in to send a request");

      const joinRequest = await Api(user.token).clubs.sendJoinRequest(
        motivation,
        clubId
      );

      if (joinRequest) {
        setStatusAlert({
          message: "The request has sent successfully",
          isOpen: true,
        });

        return joinRequest;
      }
    } catch (error) {
      setStatusAlert({ message: "problem sending request", isOpen: true });
      console.log(error);
    }
  };

  const handleFavorites = async (action: string) => {
    try {
      if (!user) throw new Error("You must be logged in to send a request");

      const { message } = await Api(user.token).clubs.handleFavorites(
        club.id,
        action
      );

      if (!isFavorite) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      setStatusAlert({ message: "problem sending request", isOpen: true });
      console.log(error);
    }
  };

  const onChangePage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("resultPage", page.toString());
    url.searchParams.set("scrollY", window.scrollY.toString());
    navigate(url.pathname + url.search);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const scrollY = url.searchParams.get("scrollY");
    if (scrollY) {
      window.scrollTo(0, +scrollY);
    }
  }, [resultsData.currPage]);

  return (
    <>
      <ClubHeader club={club} />
      <main>
        <ClubInfo
          club={club}
          finishedRaces={resultsData?.results?.length || 0}
        />
        <section className="w-full bg-[url('/club-results.jpg')] bg-cover bg-no-repeat">
          <div className="max-w-5xl mx-4 lg:mx-auto rounded-t-xl overflow-hidden pt-6">
            <ClubResultsFilter getFilters={getFilters} />
            <div className="w-full">
              <CustomTable
                rows={resultsRows}
                isLoading={false}
                titleColor="bg-[#1E1C1F]"
              />
              <div className="w-full flex justify-center my-4">
                <Pagination
                  onChangePage={(page) => onChangePage(page)}
                  currPage={resultsData.currPage}
                  pagesCount={resultsData.totalPages || 1}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="my-8 w-full">
          <div className="max-w-7xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden">
            <h2 className="text-3xl font-semibold">Members</h2>
            <CustomCarousel
              items={club.members}
              ItemCard={MemberCarouseltem}
              initTranslate={club.members.length * 200 - 600}
            />
          </div>
        </section>
        <JoinClubForm club={club} user={user} onSubmit={createJoinRequest} />
        <section className="w-full bg-[#1E1C1F] p-6">
          <div className="max-w-7xl mx-4 lg:mx-auto">
            <h3 className="text-2xl text-white border-b-2 border-red-500 font-semibold mb-6 md:mb-16">
              Club related news
            </h3>
            <div className="flex flex-wrap gap-8 w-full justify-center items-center">
              {fakeNews.map((news: any) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>
        <Snackbar
          open={statusAlert.isOpen}
          autoHideDuration={2000}
          onClose={() => setStatusAlert({ message: "", isOpen: false })}
          message={statusAlert.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setStatusAlert({ message: "", isOpen: false })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </main>
      {user?.role === "viewer" && (
        <FavoriteClubButton
          isFavorite={isFavorite}
          handleFavorites={handleFavorites}
        />
      )}
    </>
  );
};

export default ClubPage;
