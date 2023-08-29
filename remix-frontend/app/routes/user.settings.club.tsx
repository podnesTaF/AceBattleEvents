import { LoaderArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { ChangeImageForm, ConfirmAlert, CustomTable } from "~/components";
import AdminHeader from "~/components/admin/AdminHeader";
import EditableInput from "~/components/shared/forms/EditableInput";
import { authenticator, transformToClubMembers } from "~/lib/utils";

const fields = [
  {
    name: "name",
    label: "Name",
    placeholder: "enter name",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "write your city",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "write your country",
  },
];

export const loader = async ({ request }: LoaderArgs) => {
  const authedUser = await authenticator.isAuthenticated(request);

  const user = await Api(authedUser?.token).users.getUser();

  if (!user) {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  if (!user.club?.id) {
    if (user.role === "runner")
      return redirect("/clubs", {
        status: 302,
      });
    if (user.role === "manager")
      return redirect("/create-club", {
        status: 302,
      });
  }

  const club = await Api().clubs.getClub(user.club?.id + "");

  if (!club) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const membersRows = transformToClubMembers(club.members);

  return json({ user, club, membersRows, token: authedUser?.token });
};

const UserClubSettings = () => {
  const { club, user, membersRows, token } = useLoaderData<typeof loader>();
  const [editImageDialogOpen, setEditImageDialogOpen] = useState(false);
  const [editPhotoDialogOpen, setEditPhotoDialogOpen] = useState(false);
  const [confimAlertOpen, setConfirmAlertOpen] = useState(false);
  const navigate = useNavigate();

  const onUpdate = async (data: any) => {
    console.log(data);
    try {
      await Api().clubs.handleUpdateClubData(club.id, data);
      if (data.name) club.name = data.name;
      if (data.city) club.city = data.city;
      if (data.country) club.country = data.country;
      if (data.image) club.logo = data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdatePhoto = async (data: any) => {
    await onUpdate({ photo: data });
  };

  const onClose = (image?: any) => {
    if (image.title) {
      onUpdate({ logo: image });
    }
    setEditImageDialogOpen(false);
  };

  const onClosePhotoDialog = (image?: any) => {
    if (image.title) {
      onUpdate({ photo: image });
    }
    setEditPhotoDialogOpen(false);
  };

  const onDeleteClubMembers = async (ids: number[]) => {
    try {
      const updatedClub = await Api(token).clubs.kickMembers(club.id, ids);

      if (updatedClub) {
        navigate(`/user/settings/club`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogClose = () => {
    setConfirmAlertOpen(false);
  };

  const onLeaveClub = async () => {
    try {
      const updatedUser = await Api(token).clubs.leaveClub(club.id);

      if (updatedUser) {
        handleDialogClose();
        navigate(`/clubs`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm({
    mode: "onChange",
  });

  return (
    <div className="w-full">
      <AdminHeader
        title="Club Settings"
        pageName="Settings"
        description="settings"
      />
      <main className="mx-4 md:mx-6 lg:mx-auto w-full lg:max-w-6xl mb-7">
        <div className="w-full max-w-5xl">
          <div className="flex w-full gap-4 items-center py-3 border-b-[1px] border-black mb-4">
            {club?.logo && (
              <img src={club?.logo?.mediaUrl} alt="logo" width={50} />
            )}
            <h4 className="text-2xl font-semibold">{club.name}</h4>
            {user.role === "runner" && (
              <button
                onClick={() => setConfirmAlertOpen(true)}
                className="border-none py-2 px-5 ml-auto rounded-md bg-red-500 text-white font-semibold text-xl hover:opacity-95 active:scale-95"
              >
                Leave Club
              </button>
            )}
          </div>
          {user.role === "manager" && (
            <div className="w-full flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="flex flex-col gap-4 w-full lg:w-3/5">
                <div className="w-full">
                  <EditableInput
                    type={"text"}
                    onSubmit={onUpdate}
                    label={"Name"}
                    value={club.name}
                    name={"name"}
                  />
                </div>
                <div className="w-full">
                  <EditableInput
                    type={"text"}
                    onSubmit={onUpdate}
                    label={"City"}
                    value={club.city}
                    name={"city"}
                  />
                </div>
                <div className="w-full">
                  <EditableInput
                    type={"text"}
                    onSubmit={onUpdate}
                    label={"Country"}
                    value={club.country}
                    name={"country"}
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/5">
                <div className="mt-4">
                  <img
                    src={
                      club.logo?.mediaUrl ||
                      "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg"
                    }
                    alt="club logo"
                    className="rounded-2xl object-cover mb-4 max-w-[200px] mx-auto"
                  />
                  <button
                    onClick={() => setEditImageDialogOpen(true)}
                    className="w-full py-2 border-none rounded-md bg-green-500 text-white font-semibold text-xl hover:opacity-95 active:scale-95"
                  >
                    Edit Logo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {user.role === "runner" ? (
          <div className="mt-auto flex justify-center">
            <h3 className="text-2xl font-semibold text-gray-500">
              *By leaving the club you will not be able to enter this club for
              14 days.
            </h3>
          </div>
        ) : (
          <>
            <div className="w-full flex gap-4 flex-col">
              <div className="mb-4">
                <div className="max-w-[300px]">
                  <button
                    onClick={() => setEditPhotoDialogOpen(true)}
                    className="w-full py-2 border-none rounded-md bg-green-500 text-white font-semibold text-xl hover:opacity-95 active:scale-95 mb-4"
                  >
                    Edit club photo
                  </button>
                </div>
                {club.photo ? (
                  <img
                    src={club.photo?.mediaUrl}
                    alt="photo"
                    className="w-full object-cover max-h-96"
                  />
                ) : (
                  <h4 className="text-2xl text-center">
                    There is no photo of the club yet
                  </h4>
                )}
              </div>
            </div>
            <div className="w-full my-4">
              <h3 className="font-semibold text-2xl mb-4">
                Manage Club Members
              </h3>
              <CustomTable
                titleColor="bg-black"
                isTitleStraight={true}
                rows={membersRows}
                isLoading={false}
                deletableRows={true}
                ids={club.members.map((m) => m.id)}
                onDelete={onDeleteClubMembers}
              />
            </div>
          </>
        )}
      </main>
      <ChangeImageForm
        successCallback={onUpdate}
        setEditImageDialogOpen={setEditImageDialogOpen}
        editImageDialogOpen={editImageDialogOpen}
        onClose={onClose}
      />
      <ChangeImageForm
        successCallback={onUpdatePhoto}
        setEditImageDialogOpen={setEditPhotoDialogOpen}
        editImageDialogOpen={editPhotoDialogOpen}
        onClose={onClosePhotoDialog}
      />
      <ConfirmAlert
        onSure={onLeaveClub}
        onCancel={handleDialogClose}
        open={confimAlertOpen}
        handleClose={handleDialogClose}
        title={"Are you sure you want to leave the club?"}
        description={
          "*By leaving the club you will not be able to enter this club for 14 days."
        }
      />
    </div>
  );
};

export default UserClubSettings;
