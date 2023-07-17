import React from "react";

export const metadata = {
  title: "Add team - Ace Battle Events",
  description: "Add team page of Ace Battle Events website",
};

interface Props {
  children: React.ReactNode;
}

const AddTeamLayout: React.FC<Props> = ({ children }) => {
  return children as JSX.Element;
};

export default AddTeamLayout;
