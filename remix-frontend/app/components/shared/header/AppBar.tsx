import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import {
  AdminStripe,
  AnnonceStripe,
  CustomDrawer,
  ProfileMenu,
} from "~/components";
import { IAdmin, IUser } from "~/lib/types";
import { links } from "~/lib/utils";

interface AppBarProps {
  user: IUser | null;
  admin: IAdmin | null;
}

const AppBar: React.FC<AppBarProps> = ({ user, admin }) => {
  const [open, setOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

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

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`relative w-full ${
          admin && user
            ? "mb-[106px] md:mb-[106px]"
            : admin
            ? "mb-[106px] md:mb-[92px]"
            : user
            ? "mb-[66px] md:mb-[66px]"
            : "mb-[66px] md:mb-[50px]"
        } 
        ${isScrollingUp ? "xl:mb-12" : ""}`}
      >
        <div className="w-full fixed top-0 left-0 z-30">
          {admin && (
            <div className={`transition-all`}>
              <AdminStripe admin={admin} />
            </div>
          )}
          <div
            className={`xl:flex justify-between items-center px-5 z-30 ${
              isScrollingUp ? "py-0" : "xl:py-2"
            } transition-all bg-[#1E1C1F] items-center w-full z-10 shadow-lg`}
          >
            <div className={"flex justify-between items-center"}>
              <div className="xl:hidden">
                <IconButton
                  onClick={() => setOpen(true)}
                  className={"text-white items-center"}
                >
                  <MenuIcon sx={{ fontSize: 40, color: "white" }} />
                </IconButton>
              </div>
              <img
                onClick={() => navigate("/")}
                src="/main-logo-white.svg"
                alt="abe"
                className={`cursor-pointer h-5 md:h-auto hover:opacity-90 active:scale-[0.97] transition-all ${
                  !isScrollingUp ? "block lg:hidden 2xl:block" : "hidden"
                }`}
                height={36}
              />
              <img
                onClick={() => navigate("/")}
                src="/abe-short-logo-white.svg"
                alt="abe"
                height={45}
                className={`h-9 md:h-11 cursor-pointer hover:opacity-90 active:scale-[0.97] ${
                  isScrollingUp ? "block" : "hidden lg:block 2xl:hidden"
                }`}
              />
            </div>
            <nav className={"hidden xl:flex xl:gap-4 2xl:gap-6 items-center"}>
              {links.map((link, index) => (
                <Link key={index} to={link.to} className="hover:opacity-80">
                  <p
                    className={`text-lg uppercase font-semibold ${
                      pathname.split("/")[1] === link.to.split("/")[1]
                        ? "text-[#FF0000]"
                        : "text-white"
                    }`}
                  >
                    {link.label}
                  </p>
                </Link>
              ))}
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
        </div>
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
