import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  color: "white" | "red";
  onClick?: () => void;
}

const EventButton = ({
  children,
  color = "red",
  onClick,
  ...props
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:780px)");
  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="contained"
      className="!rounded-sm !py-1.5 !px-2 md:!py-3 font-semibold !gap-2"
      sx={{
        backgroundColor: color === "red" ? "#FF1744" : "white",
        color: color === "red" ? "white" : "black",
        "&:hover": {
          opacity: 0.9,
          bgcolor: color === "red" ? "#FF1744" : "white",
          color: color === "red" ? "white" : "black",
        },
      }}
      size={isSmallScreen ? "medium" : "large"}
      {...(props as any)}
    >
      <p className="font-semibold">{children}</p>
      {isHovered ? (
        <ArrowForwardIcon fontSize={isSmallScreen ? "small" : "medium"} />
      ) : (
        <ArrowOutwardIcon fontSize={isSmallScreen ? "small" : "medium"} />
      )}
    </Button>
  );
};

export default EventButton;
