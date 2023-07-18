"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const MainAdminPage = () => {
  const [adminStats, setAdminStats] = useState<any[]>([]);

  useEffect(() => {
    const getAdminStats = async () => {
      try {
        const { data } = await axios.get(
          "https://abe-server.up.railway.app/api/v1/teams/count/all"
        );
        setAdminStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAdminStats();
  }, []);

  return (
    <div className="w-full">
      <AdminHeader title="" description="Admin page" />
      <div className="flex flex-col items-center justify-center bg-gray-100 py-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        {adminStats.length ? (
          <div className="grid grid-cols-2 gap-4">
            {adminStats.map((stat: any) => (
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {Object.keys(stat)[0]}
                </h2>
                <p className="text-3xl font-bold text-blue-500">
                  {Object.values(stat)[0] as number}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Skeleton variant="rectangular" width={300} height={250} />
        )}
      </div>
    </div>
  );
};

export default MainAdminPage;
