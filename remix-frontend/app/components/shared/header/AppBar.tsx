import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import {
  AdminStripe,
  AnnonceStripe,
  AuthStripe,
  CustomDrawer,
} from "~/components";
import { IAdmin, IUser } from "~/lib/types";
import { links } from "~/lib/utils";

interface AppBarProps {
  admin: IAdmin | null;
  user: IUser | null;
}

const AppBar: React.FC<AppBarProps> = ({ admin, user }) => {
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
          admin ? "mb-[96px] lg:mb-[92px]" : "mb-[56px] md:mb-[80px]"
        } 
        ${isScrollingUp ? "lg:mb-12" : ""}`}
      >
        <div className="w-full fixed top-0 left-0 z-30">
          {admin && (
            <div className={`transition-all`}>
              <AdminStripe admin={admin} />
            </div>
          )}
          <AuthStripe user={user} isScrollingUp={isScrollingUp} />
          <div
            className={`lg:flex justify-between z-30 ${
              isScrollingUp ? "py-0" : "lg:py-2"
            } transition-all bg-[#1E1C1F] items-center w-full z-10 shadow-lg`}
          >
            <div className="lg:flex justify-between items-center w-full px-4 max-w-[1500px] mx-auto">
              <div className={"flex justify-between items-center"}>
                <div className="lg:hidden">
                  <IconButton
                    onClick={() => setOpen(true)}
                    className={"text-white items-center"}
                  >
                    <MenuIcon sx={{ fontSize: 40, color: "white" }} />
                  </IconButton>
                </div>
                <img
                  onClick={() => navigate("/")}
                  src="/acebattlemile.svg"
                  alt="abe"
                  className={`cursor-pointer h-5 md:h-7 hover:opacity-90 active:scale-[0.97] transition-all ${
                    !isScrollingUp ? "block lg:hidden xl:block" : "hidden"
                  }`}
                  height={28}
                />
                <img
                  onClick={() => navigate("/")}
                  src="/abm-short-logo-white.svg"
                  alt="abe"
                  height={45}
                  className={`h-9 md:h-11 cursor-pointer hover:opacity-90 active:scale-[0.97] ${
                    isScrollingUp ? "block" : "hidden lg:block xl:hidden"
                  }`}
                />
              </div>
              <nav className={"hidden lg:flex lg:gap-4 xl:gap-6 items-center"}>
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
              </nav>
            </div>
          </div>
        </div>
      </div>

      {pathname === "/" && <AnnonceStripe />}
      <CustomDrawer setOpen={setOpen} open={open} user={user} />
    </>
  );
};

export default AppBar;
