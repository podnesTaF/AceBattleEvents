import { IClub, IUser } from "~/lib/types";

const FavoriteClubsSection = ({
  user,
  favoriteClubs,
}: {
  user: IUser;
  favoriteClubs?: IClub[];
}) => {
  if (user.role === "viewer") {
    return (
      <>
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Your favorite clubs
        </h2>
        <ul>
          {favoriteClubs?.length ? (
            favoriteClubs.map((club) => (
              <li key={club.id}>
                <p>{club.name}</p>
              </li>
            ))
          ) : (
            <h3 className="text-2xl">No favorite clubs yet</h3>
          )}
        </ul>
      </>
    );
  } else {
    return null;
  }
};

export default FavoriteClubsSection;
