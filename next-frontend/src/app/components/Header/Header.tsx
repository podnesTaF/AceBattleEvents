import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AnnonceStripe from "./components/AnnounceStripe";
import AuthStripe from "./components/AuthStripe";

const Header = ({ session }: { session: Session }) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const pathname = usePathname();

  const handleScroll = () => {
    if (window.scrollY > 50) {
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
      <div className={`relative w-full mb-[56px] md:mb-[80px]`}>
        <div className="w-full fixed top-0 left-0 z-30">
          <AuthStripe session={session} isScrollingUp={isScrollingUp} />
        </div>
      </div>
      {pathname === "/" && <AnnonceStripe />}
      {/* <CustomDrawer setOpen={setOpen} open={open} user={user} /> */}
    </>
  );
};

export default Header;
