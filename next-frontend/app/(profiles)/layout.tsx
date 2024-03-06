import AppBar from "@/common/components/navbar/AppBar";
import { auth } from "../(auth)/_lib/utils/auth";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="relative">
      <AppBar session={session} />
      {children}
    </div>
  );
};

export default ProfileLayout;
