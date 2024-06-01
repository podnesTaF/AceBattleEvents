import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";
import React from "react";

interface FavoriteClubButtonProps {
  handleFavorites: (action: string) => void;
  isFavorite: boolean;
  position?: string;
}

const FavoriteClubButton: React.FC<FavoriteClubButtonProps> = ({
  handleFavorites,
  isFavorite,
  position,
}) => {
  return isFavorite ? (
    <IconButton
      onClick={handleFavorites.bind(null, "remove")}
      sx={{
        bgcolor: "white",
        opacity: 0.3,
        color: "green",
        position: position || "fixed",
        bottom: 20,
        right: 20,
        "&:hover": {
          bgcolor: "white",
          opacity: 1,
        },
      }}
    >
      <CheckIcon fontSize="large" />
    </IconButton>
  ) : (
    <IconButton
      onClick={handleFavorites.bind(null, "add")}
      sx={{
        bgcolor: "white",
        opacity: 0.3,
        color: "red",
        position: "fixed",
        bottom: 20,
        right: 20,
        "&:hover": {
          bgcolor: "white",
          opacity: 1,
        },
      }}
    >
      <StarBorderIcon fontSize="large" />
    </IconButton>
  );
};

export default FavoriteClubButton;
