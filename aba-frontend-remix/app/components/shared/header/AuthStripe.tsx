import PersonIcon from "@mui/icons-material/Person";
import { Collapse } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AuthenticatedUser } from "~/lib/types";

const AuthStripe = ({
  user,
  isScrollingUp,
}: {
  user: AuthenticatedUser | null;
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
    <Collapse in={!isScrollingUp} timeout={300}>
      <div className={`w-full bg-white py-1 hidden md:block transition-all`}>
        <div className="flex flex-col md:flex-row justify-between w-full px-4 max-w-[1500px] mx-auto">
          <div className="flex gap-2 items-center justify-between">
            {user && (
              <h4 className="text-sm md:text-lg font-semibold">
                Welcome, {user.firstName} {user.lastName}!
              </h4>
            )}
          </div>
          <div className={`gap-4 items-center flex-wrap transition-all flex`}>
            {user ? (
              <>
                <Link
                  to={"/profile/" + user.id + "/Teams"}
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
                  to={"/register"}
                  className={`text-sm py-1 px-2 rounded-sm bg-black text-white font-semibold hover:text-green-500 transition-all  ${
                    location.pathname === "/register" && "text-red-500"
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
        </div>
      </div>
    </Collapse>
  );
};

export default AuthStripe;
