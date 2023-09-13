import { Breadcrumbs } from "@mui/material";
import { Link } from "@remix-run/react";
import React from "react";

interface CustomCrumbsProps {
  links: {
    title: string;
    url: string;
    icon?: any;
    active?: boolean;
  }[];
}

const CustomCrumbs: React.FC<CustomCrumbsProps> = ({ links }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {links.map((link, idx) => (
        <Link
          key={idx}
          className={`hover:underline ${link.active && "text-red-500"}`}
          color="inherit"
          to={link.url}
        >
          {link.icon && <link.icon sx={{ mr: 0.5 }} fontSize="inherit" />}
          {link.title}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default CustomCrumbs;
