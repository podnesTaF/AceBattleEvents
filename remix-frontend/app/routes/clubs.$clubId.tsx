import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import ClubHeader from "~/components/clubs/ClubHeader";
import ClubInfo from "~/components/clubs/ClubInfo";
import ClubResultsFilter from "~/components/clubs/ClubResultsFilter";
import FavoriteClubButton from "~/components/clubs/FavoriteClubButton";
import JoinClubForm from "~/components/clubs/JoinClubForm";
import MemberCarouseltem from "~/components/clubs/MemberCarouseltem";
import NewsCard from "~/components/news/NewsCard";
import CustomCarousel from "~/components/shared/CustomCarousel";
import CustomTable from "~/components/shared/tables/CustomTable";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { fakeNews } from "~/lib/clubs/data/dummy-data";
import { transformClubResults } from "~/lib/clubs/utils/transform-data";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { clubId } = params;

  const user = await authenticator.isAuthenticated(request);

  if (!clubId) throw new Error("Club not found");

  const club = await Api().clubs.getClub(clubId);

  if (!club) throw new Error("Club not found");

  const clubResults = await Api().teams.getTeamResultsByClubId(club.id);

  return json({ club, user, results: clubResults });
};

const ClubPage = () => {
  const { club, user, results } = useLoaderData<typeof loader>();
  const [statusAlert, setStatusAlert] = useState({
    message: "",
    isOpen: false,
  });
  const [filters, setFilters] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <>
      <ClubHeader club={club} />
      <main>
        <ClubInfo club={club} finishedRaces={results?.length || 0} />
        <section className="w-full bg-[url('/club-results.jpg')] bg-cover bg-no-repeat">
          <div className="max-w-5xl mx-4 lg:mx-auto rounded-t-xl overflow-hidden pt-6">
            <ClubResultsFilter getFilters={getFilters} />
            <div className="w-full">
              <CustomTable
                rows={transformClubResults(results || [])}
                isLoading={false}
                titleColor="bg-[#1E1C1F]"
              />
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
