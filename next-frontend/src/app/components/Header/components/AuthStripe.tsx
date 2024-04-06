import { Button } from "@/src/shared/ui/button";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthStripe = ({
  session,
  isScrollingUp,
}: {
  session?: Session | null;
  isScrollingUp: boolean;
}) => {
  const pathname = usePathname();
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
      className={`w-full bg-white py-1 hidden md:flex  transition-all transition-300ms`}
    >
      <div className="flex flex-col md:flex-row justify-between w-full px-4 max-w-[1500px] mx-auto">
        <div className="flex gap-2 items-center justify-between">
          {session?.user && (
            <h4 className="text-sm md:text-lg font-semibold">Welcome!</h4>
          )}
        </div>
        <div className={`gap-4 items-center flex-wrap transition-all flex`}>
          {session?.user ? (
            <>
              <Link
                href={"/profile/" + session.user.id + "/Teams"}
                className={`text-sm py-1 px-2 rounded-sm bg-black text-white font-semibold hover:text-green-500 transition-all ${
                  pathname === "/profile/" + session.user.id && "text-green-500"
                }`}
              >
                My profile
              </Link>
              <Button
                variant={"ghost"}
                onClick={() => signOut()}
                className={`text-xs flex gap-2 items-center cursor-pointer font-semibold hover:text-red-500 transition-all`}
              >
                <LogOut size={24} />
                <p className={`text-md font-semibold text-left`}>Logout</p>
              </Button>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className={`text-xs font-semibold hover:text-red-500 transition-all ${
                  pathname === "/login" && "text-red-500"
                }`}
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthStripe;
