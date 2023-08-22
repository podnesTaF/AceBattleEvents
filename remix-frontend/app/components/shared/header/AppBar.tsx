import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { AnnonceStripe, CustomDrawer, ProfileMenu } from "~/components";
import { IUser } from "~/lib/types";

interface AppBarProps {
  user: IUser | null;
}

const AppBar: React.FC<AppBarProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useLocation();
  const pathname = router.pathname;
  let navigate = useNavigate();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="xl:flex justify-between px-5 py-2 bg-[#1E1C1F] items-center w-full z-10">
        <div className={"flex justify-between items-center"}>
          <div className="xl:hidden">
            <IconButton
              onClick={() => setOpen(true)}
              className={"text-white items-center"}
            >
              <MenuIcon sx={{ fontSize: 40, color: "white" }} />
            </IconButton>
          </div>
          <h2
            onClick={() => navigate("/")}
            className={
              "text-2xl xl:text-3xl uppercase text-white cursor-pointer active:scale-95"
            }
          >
            Ace Battle Events
          </h2>
        </div>
        <nav className={"hidden xl:flex gap-4 items-center"}>
          <Link className="hover:opacity-80" to="/">
            <p
              className={`text-lg uppercase ${
                pathname === "/" ? "text-[#FF0000]" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/events">
            <p
              className={`text-lg uppercase ${
                pathname.split("/")[1] === "events"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Calendar
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/close-events">
            <p
              className={`text-lg uppercase ${
                pathname.split("/")[1] === "close-events"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Close Events
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/results">
            <p
              className={`text-lg uppercase ${
                pathname.split("/")[1] === "results"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Results
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/clubs">
            <p
              className={`text-lg uppercase ${
                pathname.split("/")[1] === "clubs"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Clubs
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/athletes">
            <p
              className={`text-lg uppercase ${
                pathname.split("/")[1] === "athletes"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Athletes
            </p>
          </Link>
          <Link className="hover:opacity-80" to="/rules">
            <p
              className={`text-lg uppercase ${
                pathname.split("/")[1] === "rules"
                  ? "text-[#FF0000]"
                  : "text-white"
              }`}
            >
              Rules
            </p>
          </Link>
          {user ? (
            <Tooltip title="Profile">
              <IconButton
                onClick={handleProfileClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={user?.image?.smallUrl}
                  sx={{ width: 40, height: 40 }}
                >
                  {user.surname[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <div className="bg-green-700 rounded-md">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/auth/register")}
                >
                  Sign up
                </Button>
              </div>
              <Button
                variant="outlined"
                color="success"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </Button>
            </>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          ></div>
        </nav>
      </div>
      {pathname === "/" && <AnnonceStripe />}
      <CustomDrawer setOpen={setOpen} open={open} user={user} />
      <ProfileMenu
        clubId={user?.clubId}
        role={user?.role}
        userId={user?.id}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  );
};

export default AppBar;
