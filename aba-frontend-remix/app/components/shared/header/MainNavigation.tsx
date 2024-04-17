import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { links } from "~/lib/utils";

const MainNavigation = ({
  isScrollingUp,
  setOpen,
}: {
  isScrollingUp: boolean;
  setOpen: (key: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className={`lg:flex justify-between z-30 ${
        isScrollingUp ? "py-1" : "lg:py-2"
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
            className={`cursor-pointer h-5 md:h-7 hover:opacity-90 active:scale-[0.97] transition-all`}
            height={28}
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
  );
};

export default MainNavigation;
