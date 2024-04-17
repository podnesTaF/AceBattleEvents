import { useEffect, useRef, useState } from "react";

import { AdminStripe, AuthStripe } from "~/components";
import { AuthenticatedUser, IAdmin } from "~/lib/types";

interface AppBarProps extends React.HTMLProps<HTMLDivElement> {
  admin?: IAdmin | null;
  user: AuthenticatedUser | null;
  DrawerComponent: React.FC<any>;
  NavComponent: React.FC<any>;
  navProps?: { [key: string]: any };
  drawerProps?: { [key: string]: any };
  height?: number;
}

const AppBar: React.FC<AppBarProps> = ({
  admin,
  user,
  DrawerComponent,
  NavComponent,
  navProps,
  drawerProps,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const appBarRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={appBarRef}
        className={`relative w-full ${
          admin ? "mb-[128px] lg:mb-[128px]" : "mb-[56px] lg:mb-[96px]"
        } ${props.className || ""}`}
        {...props}
      >
        <div className="w-full fixed top-0 left-0 z-30">
          {admin && (
            <div className={`transition-all`}>
              <AdminStripe admin={admin} />
            </div>
          )}
          <AuthStripe user={user} isScrollingUp={isScrollingUp} />
          <NavComponent
            isScrollingUp={isScrollingUp}
            setOpen={setOpen}
            {...navProps}
          />
        </div>
      </div>
      <DrawerComponent open={open} setOpen={setOpen} {...drawerProps} />
    </>
  );
};

export default AppBar;
