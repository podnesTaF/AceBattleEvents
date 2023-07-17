import React from "react";

export const metadata = {
  title: "Calendar - Ace Battle Events",
  description: "Calendar page of Ace Battle Events website",
};

interface Props {
  children: React.ReactNode;
}

const CalendarLayout: React.FC<Props> = ({ children }) => {
  return children as JSX.Element;
};

export default CalendarLayout;
