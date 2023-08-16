import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IconButton } from "@mui/material";
import { Link } from "@remix-run/react";

const links = [
  {
    title: "Rules",
    href: "/about",
  },
  {
    title: "Features",
    href: "/about",
  },
  {
    title: "Support",
    href: "/about",
  },
  {
    title: "Resources",
    href: "/about",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Competitions",
    href: "/about",
  },
];

const networksLinks = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/channel/UCMdyoMWNkZZ1UCTnarBnhcg",
    icon: YouTubeIcon,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/battle_mile/",
    icon: InstagramIcon,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100043279343057",
    icon: FacebookIcon,
  },
];

const Footer = () => {
  return (
    <div className="bg-[#1E1C1F] w-full py-4 pb-4">
      <div className="max-w-sm mx-auto lg:max-w-7xl w-full">
        <div className="flex flex-col py-6">
          <h2 className="text-3xl md:text-4xl mb-4 text-white text-center font-semibold uppercase lg:hidden">
            Ace <span className="text-red-500">Battle</span> Events
          </h2>
          <div className="flex justify-around lg:justify-center lg:items-center items-center gap-4 lg:gap-8 my-4">
            <div className="flex flex-col gap-6 w-[125px] lg:w-auto lg:flex-row">
              {links.slice(0, 3).map((link, i) => (
                <Link key={i} to={link.href}>
                  <h4 className="text-white font-semibold text-xl hover:text-red-500">
                    {link.title}
                  </h4>
                </Link>
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl text-white text-center font-semibold uppercase hidden lg:block">
              Ace <span className="text-red-500">Battle</span> Events
            </h2>
            <div className="w-[2px] bg-red-500 h-[180px] lg:hidden"></div>
            <div className="flex flex-col gap-6 w-[125px] lg:w-auto  lg:flex-row">
              {links.slice(3).map((link, i) => (
                <Link key={i} to={link.href}>
                  <h4 className="text-white font-semibold text-xl hover:text-red-500">
                    {link.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full bg-red-500 h-[2px] hidden lg:block"></div>
        </div>
        <div className="flex w-full justify-center gap-5 my-4">
          {networksLinks.map((link, i) => (
            <a href={link.href} key={i}>
              <IconButton sx={{ bgcolor: "white" }}>
                <link.icon className="text-black" fontSize="large" />
              </IconButton>
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-center">
          &copy; 2023 Ace Battle Association
        </p>
      </div>
    </div>
  );
};

export default Footer;
