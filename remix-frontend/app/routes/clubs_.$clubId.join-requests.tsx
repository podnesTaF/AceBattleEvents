import { Snackbar } from "@mui/material";
import { LoaderArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import JoinRequestCard from "~/components/clubs/JoinRequestCard";
import FilterSelect from "~/components/shared/forms/FilterSelect";
import SearchField from "~/components/shared/forms/SearchField";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { useFilter } from "~/lib/shared/hooks/useFilter";

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user || user.role !== "manager" || !user.clubId) {
    redirect("/");
    throw new Response("Unauthorized.", {
      status: 403,
    });
  }
  const { clubId } = params;
  const club = await Api(user?.token).clubs.getClub(clubId);
  const requests = await Api(user?.token).clubs.getJoinRequests(clubId!);

  if (!club) {
    throw new Response("Club not found.", {
      status: 404,
    });
  }

  return json({ club, requests, user });
};

const ClubJoinRequest = () => {
  const { club, requests, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [statusAlert, setStatusAlert] = useState<{
    message: string;
    isOpen: boolean;
  }>({ message: "", isOpen: false });

  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const onStatusChange = async (status: string, userId: number) => {
    if (status === "accept") {
      try {
        const res = await Api(user?.token).clubs.acceptJoinRequest({
          userId: userId.toString(),
          clubId: club.id + "",
        });
        setStatusAlert({
          message: res?.message || "User accepted",
          isOpen: true,
        });
      } catch (error) {
        console.log("error accepting");
      }
    } else {
      try {
        const res = await Api(user?.token).clubs.rejectJoinRequest({
          userId: userId.toString(),
          clubId: club.id + "",
        });
        setStatusAlert({
          message: res?.message || "User declined",
          isOpen: true,
        });
      } catch (error) {
        console.log("error rejecting");
      }
    }

    setTimeout(() => {
      navigate(`/clubs/${club.id}/join-requests`);
    }, 3000);
  };

  return (
    <>
      <header className="w-full flex flex-col-reverse md:flex-row">
        <div className="bg-yellow-400 p-4 md:h-[350px] flex justify-center items-center w-full md:w-1/2 lg:w-1/3">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Club Membership Requests
          </h3>
        </div>
        <img
          src={club.photo?.mediaUrl || "/clubs-lg.jpg"}
          alt="club photo"
          width={1200}
          height={350}
          className="w-full object-cover md:w-1/2 lg:w-2/3 h-[350px] object-top"
        />
      </header>
      <main className="max-w-6xl mx-4 lg:mx-auto my-8">
        <div className="flex flex-col md:flex-row justify-between w-full mb-6 items-center">
          <div className="mb-4 md:mb-0 w-full md:w-[400px]">
            <SearchField onChangeInput={onChangeInput} value={searchValue} />
          </div>
          <div className="w-full md:w-[300px]">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "")?.value || ""}
              label="sort by"
              placeholder="sort by"
              values={[
                ["latest", "Latest"],
                ["oldest", "Oldest"],
              ]}
              labelHidden={true}
            />
          </div>
        </div>
        <div className="w-full my-6 border-y-[1px] border-gray-200 rounded-md overflow-hidden">
          {requests?.length ? (
            requests?.map((req: any) => (
              <JoinRequestCard
                key={req.id}
                onStatusChange={onStatusChange}
                request={req}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl font-semibold">No requests</h3>
              <p className="text-gray-500">
                There are no requests to join this club
              </p>
            </div>
          )}
        </div>
        <Snackbar
          open={statusAlert.isOpen}
          autoHideDuration={3000}
          onClose={() => setStatusAlert({ message: "", isOpen: false })}
          message={statusAlert.message}
        />
      </main>
    </>
  );
};

export default ClubJoinRequest;
