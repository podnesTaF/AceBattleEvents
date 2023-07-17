export const metadata = {
  title: "Close Events - Ace Battle Events",
  description: "Close Events page of Ace Battle Events website",
};

interface Props {
  children: React.ReactNode;
}

const CloseEventLayout: React.FC<Props> = ({ children }) => {
  return children as JSX.Element;
};

export default CloseEventLayout;
