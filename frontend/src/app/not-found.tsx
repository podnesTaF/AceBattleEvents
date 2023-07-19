"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-calc-screen">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
      <h4
        onClick={() => router.back()}
        className="px-4 py-2 mt-4 text-white bg-gray-800 rounded hover:bg-gray-700"
      >
        Go Back
      </h4>
    </div>
  );
};

export default NotFound;
