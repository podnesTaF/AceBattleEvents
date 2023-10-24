import { Skeleton } from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import AdminHeader from "~/components/admin/AdminHeader";

export const loader = async () => {
  const adminStats = await Api().teams.CountAll();

  return json({
    adminStats,
  });
};

const MainAdminPage = () => {
  const { adminStats } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <AdminHeader
        title=""
        pageName="Admin Dashboard"
        description="Admin page"
      />
      <div className="flex flex-col items-center justify-center bg-gray-100 py-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        {adminStats.length ? (
          <div className="grid grid-cols-2 gap-4">
            {adminStats.map((stat: any, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
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
