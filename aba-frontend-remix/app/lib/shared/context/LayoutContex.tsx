import { ReactNode, createContext, useContext, useState } from "react";

interface LayoutContextType {
  showNav: boolean;
  setShowNav: (show: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [showNav, setShowNav] = useState<boolean>(true);

  return (
    <LayoutContext.Provider value={{ showNav, setShowNav }}>
      {children}
    </LayoutContext.Provider>
  );
};
