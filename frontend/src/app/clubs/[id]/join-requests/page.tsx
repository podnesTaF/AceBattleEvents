"use client";

import JoinRequestCard from "@/components/clubs/JoinRequestCard";
import FilterSelect from "@/components/events/FilterSelect";
import SearchField from "@/components/events/SearchField";
import { useFilter } from "@/hooks/useFilter";
import {
  useAcceptJoinRequestMutation,
  useFetchClubQuery,
  useGetJoinRequestsQuery,
  useRejectJoinRequestMutation,
} from "@/services/clubService";
import { Snackbar } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

const JoinRequestsPage: NextPage<Props> = ({ params: { id } }) => {
  const [statusAlert, setStatusAlert] = useState<{
    message: string;
    isOpen: boolean;
  }>({ message: "", isOpen: false });

  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const {
    data: club,
    isLoading,
    error,
  } = useFetchClubQuery({ id: +id || null });
  const {
    data: requests,
    isLoading: isLoadingRequests,
    error: errorRequests,
  } = useGetJoinRequestsQuery({ clubId: +id || null });
  const [rejectJoinRequest, { data: rejectResponse }] =
    useRejectJoinRequestMutation();
  const [acceptJoinRequest, { data }] = useAcceptJoinRequestMutation();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const onStatusChange = async (status: string, userId: number) => {
    if (status === "accept") {
      try {
        await acceptJoinRequest({ userId, clubId: +id });
        setStatusAlert({
          message: data?.message || "User accepted",
          isOpen: true,
        });
      } catch (error) {
        console.log("error accepting");
      }
    } else {
      try {
        await rejectJoinRequest({ userId, clubId: +id });
        setStatusAlert({
          message: rejectResponse?.message || "User declined",
          isOpen: true,
        });
      } catch (error) {
        console.log("error rejecting");
      }
    }
  };

  if (isLoading || !club) return <div>loading...</div>;

  return (
    <>
      <header className="w-full flex flex-col-reverse md:flex-row">
        <div className="bg-yellow-400 p-4 md:h-[350px] flex justify-center items-center w-full md:w-1/2 lg:w-1/3">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Club Membership Requests
          </h3>
        </div>
        <Image
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
          {requests?.map((req: any) => (
            <JoinRequestCard
              key={req.id}
              onStatusChange={onStatusChange}
              request={req}
            />
          ))}
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

export default JoinRequestsPage;
