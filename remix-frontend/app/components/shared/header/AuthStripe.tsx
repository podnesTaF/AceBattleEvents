import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import { Collapse, IconButton } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { IUser } from "~/lib/types";

const AuthStripe = ({
  user,
  isScrollingUp,
}: {
  user: IUser | null;
  isScrollingUp: boolean;
}) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setExpanded(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 768) {
          setExpanded(true);
        } else {
          setExpanded(false);
        }
      });
    };
  }, []);

  return (
    <div
      className={`w-full bg-white py-1 ${isScrollingUp ? "hidden" : "block"}`}
    >
      <div className="flex flex-col md:flex-row justify-between w-full px-4 max-w-[1500px] mx-auto">
        <div className="flex gap-2 items-center justify-between">
          {user && (
            <h4 className="text-sm md:text-lg font-semibold">
              Welcome, {user.name} {user.surname}!
            </h4>
          )}
          <div className="lg:hidden">
            <IconButton onClick={() => setExpanded((prev) => !prev)}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
        </div>
        <Collapse in={expanded}>
          <div className={`gap-4 items-center flex-wrap transition-all flex`}>
            {user ? (
              <>
                {user.role === "manager" && user.clubId && (
                  <>
                    <Link
                      to={`/clubs/${user.clubId}/join-requests`}
                      className={`text-sm font-semibold hover:text-red-500 transition-all`}
                    >
                      Join Requests
                    </Link>
                    <Link
                      to={"/add-team"}
                      className={`text-sm font-semibold hover:text-red-500 transition-all`}
                    >
                      Form a Team
                    </Link>
                  </>
                )}
                <Link
                  to={"/profile/" + user.id}
                  className={`text-sm py-1 px-2 rounded-sm bg-black text-white font-semibold hover:text-green-500 transition-all ${
                    location.pathname === "/profile/" + user.id &&
                    "text-green-500"
                  }`}
                >
                  <PersonIcon /> My profile
                </Link>
                <Link
                  to={"/logout"}
                  className={`text-xs font-semibold hover:text-red-500 transition-all`}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/join-us"}
                  className={`text-sm py-1 px-2 rounded-sm bg-black text-white font-semibold hover:text-green-500 transition-all  ${
                    location.pathname === "/join-us" && "text-red-500"
                  }`}
                >
                  Join Us
                </Link>
                <Link
                  to={"/auth/login"}
                  className={`text-xs font-semibold hover:text-red-500 transition-all ${
                    location.pathname === "/auth/login" && "text-red-500"
                  }`}
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default AuthStripe;
