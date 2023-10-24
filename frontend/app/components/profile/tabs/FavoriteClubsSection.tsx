import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Api } from "~/api/axiosInstance";
import { FavoriteClubButton } from "~/components/clubs";
import { IClub, IUser } from "~/lib/types";
import ClubPreview from "../ClubPreview";
import ClubStatistics from "../ClubStatistics";

const FavoriteClubsSection = ({
  user,
  favoriteClubs,
  token,
}: {
  user: IUser;
  favoriteClubs?: IClub[];
  token?: string;
}) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = favoriteClubs?.length || 1;

  const handleNext = () => {
    if (activeStep >= maxSteps - 1) {
      setActiveStep(0);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep <= 0) {
      setActiveStep(maxSteps - 1);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleFavorites = async (action: string, club: IClub) => {
    try {
      if (!token) throw new Error("You must be logged in to send a request");

      const { message } = await Api(token).clubs.handleFavorites(
        club.id,
        action
      );
      handleStepChange(0);
      navigate(`/profile/${user.id}/Favorites?scrollY=${window.scrollY}`);
    } catch (error) {
      console.log(error);
    }
  };
  if (user.role === "viewer") {
    return (
      <div className="w-full relative">
        <div className="carousel-container overflow-hidden relative">
          <div
            className="w-full flex transition-transform ease-in-out duration-500"
            style={{ transform: `translateX(-${activeStep * 100}%)` }}
          >
            {favoriteClubs?.length ? (
              favoriteClubs.map((club, index) => (
                <div
                  key={club.id}
                  className="w-full flex-shrink-0 flex items-center relative"
                >
                  <div className="w-full">
                    <ClubPreview club={club} />
                    <ClubStatistics club={club} />
                  </div>
                  <FavoriteClubButton
                    position="absolute"
                    isFavorite={true}
                    handleFavorites={(action) => handleFavorites(action, club)}
                  />
                  <Link
                    to={`/clubs/${club.id}`}
                    className="absolute top-5 right-5"
                  >
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
                      More
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex justify-center py-8 w-full">
                <h2 className="text-2xl font-semibold text-gray-700">
                  You have no favorite clubs yet
                </h2>
              </div>
            )}
          </div>
          {favoriteClubs?.length ? (
            <div className="carousel-navigation absolute top-1/2 left-0 right-0 flex justify-between">
              <IconButton onClick={handleBack}>
                <ArrowBackIosIcon className="text-white" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                <ArrowForwardIosIcon className="text-white" />
              </IconButton>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default FavoriteClubsSection;
