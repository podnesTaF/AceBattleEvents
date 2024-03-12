"use client";

import { ReactNode, createContext, useContext } from "react";

interface EditableContextType {
  edit: boolean;
  values: string[];
  onChange: (values: string[]) => void;
}

export const EditableContext = createContext<EditableContextType | undefined>(
  undefined
);

export const useEditableContext = () => {
  const context = useContext(EditableContext);
  if (context === undefined) {
    throw new Error(
      "useEditableContext must be used within an EditableProvider"
    );
  }
  return context;
};
interface EditableProviderProps extends EditableContextType {
  children: ReactNode; // Correctly specifying children here
}

export const EditableProvider: React.FC<EditableProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <EditableContext.Provider value={props}>
      {children}
    </EditableContext.Provider>
  );
};
