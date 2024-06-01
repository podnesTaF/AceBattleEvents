import { Menu } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useLocation } from "@remix-run/react";
import { IEvent } from "~/lib/types";
import { getEventHeaderItems } from "~/lib/utils";
import EventButton from "../EventButton";

interface IProps {
  setOpen: (key: boolean) => void;
  event: IEvent;
  isEventPast: boolean;
  openModal?: () => void;
  modalVisible?: boolean;
}

const EventNavigation = ({
  event,
  isEventPast,
  setOpen,
  openModal,
  modalVisible = true,
}: IProps): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className="bg-[#1e1c1f] py-1 2xl:py-2 px-4 border-b border-b-white/20">
      <div className="flex justify-between gap-6 items-center">
        <div className="hidden lg:block">
          <BackToHome />
        </div>
        <div className="block lg:hidden">
          <Menu
            onClick={() => setOpen(true)}
            fontSize="large"
            className="text-white"
          />
        </div>
        <ul className="flex md:gap-3 lg:gap-6 items-center">
          {getEventHeaderItems(event, isEventPast).map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className="hover:opacity-80 hidden lg:block"
            >
              <p
                className={`text-sm 2xl:text-base uppercase font-semibold ${
                  pathname === item.href ? "text-[#FF0000]" : "text-white"
                }`}
              >
                {item.title}
              </p>
            </Link>
          ))}
          {modalVisible && !isEventPast && (
            <EventButton
              onClick={openModal}
              className="hidden lg:block"
              color="red"
            >
              <span className="text-sm 2xl:text-inherit">Register Now</span>
            </EventButton>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EventNavigation;

export function BackToHome() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <ArrowBackIosIcon fontSize="small" className="text-white" />
      <p className="text-white font-semibold">Back to Ace Battle Mile</p>
    </Link>
  );
}
