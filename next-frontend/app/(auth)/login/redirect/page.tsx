"use client";

import { useHandleRedirect } from "@/src/features/auth";

const RedirectPage = () => {
  const { errorMessage } = useHandleRedirect();

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-color-primary text-center">
        Redirecting...
      </h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default RedirectPage;
