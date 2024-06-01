import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { BackToHome } from "./EventNavigation";

const EventDrawerMenu = ({
  open,
  setOpen,
  items,
  modalVisible = true,
}: {
  open: boolean;
  setOpen: (key: boolean) => void;
  items: {
    title: string;
    href: string;
  }[];
  modalVisible?: boolean;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div
        className={"flex flex-col items-center h-screen bg-[#1E1C1F] p-2"}
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <div className={"flex justify-between w-full items-center"}>
          <img
            onClick={() => navigate("/")}
            src="/acebattlemile.svg"
            alt="abe"
            className={`cursor-pointer h-5 hover:opacity-90 active:scale-[0.97] transition-all`}
            height={36}
          />
          <IconButton onClick={() => setOpen(false)} className={"text-white"}>
            <CloseIcon fontSize={"large"} className="text-white" />
          </IconButton>
        </div>
        <div className={"w-full p-3"}>
          {items.map((item, i) => (
            <Link key={i} to={item.href}>
              <p
                className={`hover:opacity-80 py-2 border-b-2 border-solid border-red-300/10 text-lg font-semibold uppercase ${
                  pathname === item.href ? "text-[#FF0000]" : "text-white"
                }`}
              >
                {item.title}
              </p>
            </Link>
          ))}
          <div className="my-2">
            <BackToHome />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default EventDrawerMenu;
