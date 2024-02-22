import { Api } from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/lib/auth/utils/auth";
import ProfileItemWrapper from "./_components/ProfileItemWrapper";
import UserAvatar from "./_components/UserAvatar";
import { calculateSettingsProgress } from "./_lib/utils/calculate-settings-progress";

export default async function ProfilePage() {
  const session = await auth();
  const user = await Api(session).users.getMe();

  const progress = calculateSettingsProgress(user);

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <h3 className="text-2xl text-right mb-2 font-semibold">
          {progress.value.toFixed(0)} % completed
        </h3>
        <Progress value={progress.value} color="success" className="w-full" />
      </div>
      <div className="shadow-md border-gray-300 border-[1px]">
        <ProfileItemWrapper>
          <h3>Profile Information</h3>
        </ProfileItemWrapper>
        <ProfileItemWrapper className="justify-between items-center gap-3">
          <h4 className="text-gray-400 flex-[1]">Avatar</h4>
          <div className="flex-[3] ml-7">
            <UserAvatar className="w-[58px] h-[58px]" user={user} />
          </div>
          <Button size="lg" className="font-semibold">
            Edit
          </Button>
          <Button size="lg" variant={"link"} className="font-semibold">
            Remove
          </Button>
        </ProfileItemWrapper>
        <ProfileItemWrapper className="flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="text-gray-400">Image</h4>
            <div className="flex gap-2">
              <Button size="lg" className="font-semibold">
                Edit
              </Button>
              <Button size="lg" variant={"link"} className="font-semibold">
                Remove
              </Button>
            </div>
          </div>
          <div className="flex flex-1 gap-3 md:gap-6 items-end">
            <div className="max-w-[220px] text-gray-400">
              <p>
                *It will make easier to reach you on the actual competition.
                Please provide your real photo
              </p>
            </div>
            <div className="border-[5px] border-gray-400 hover:border-gray-300 border-dashed h-44 flex-1 flex justify-center items-center">
              <h4 className="text-gray-400 hover:text-gray-300 text-center select-none">
                Drag and drop a photo or <br />
                <span className="text-black hover:underline">
                  Select a file
                </span>
              </h4>
            </div>
          </div>
        </ProfileItemWrapper>
        <ProfileItemWrapper className="gap-3 items-center">
          <h4 className="text-gray-400 w-44">Your Name</h4>
          <h4 className="flex-[3]">{user.firstName + " " + user.secondName}</h4>
          <Button size="lg" className="font-semibold">
            Edit
          </Button>
        </ProfileItemWrapper>
        <ProfileItemWrapper className="gap-3 items-center">
          <h4 className="text-gray-400 w-44">Email</h4>
          <h4 className="flex-[3] text-gray-400">{user.email}</h4>
        </ProfileItemWrapper>
        <ProfileItemWrapper className="gap-3 items-center">
          <h4 className="text-gray-400 w-44">Password</h4>
          <h4 className="flex-[3] text-gray-400">***********</h4>
          <Button size="lg" className="font-semibold">
            Change password
          </Button>
        </ProfileItemWrapper>
      </div>
    </div>
  );
}
