import React from "react";

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, title }) => {
  return (
    <div className="m-5">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <div className="rounded shadow-md p-4 w-full flex flex-col md:flex-row flex-wrap gap-3 md:justify-around">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
