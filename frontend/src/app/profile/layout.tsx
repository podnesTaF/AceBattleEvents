import React from "react";

export const metadata = {
  title: "Profile - Ace Battle Events",
  description: "Profile page of Ace Battle Events website",
};

interface Props {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return children as JSX.Element;
};

export default ProfileLayout;
