import { Header } from "@/src/app/components/Header";
import { auth } from "@/src/entities/Auth/utils";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="relative">
      <Header session={session} />
      {children}
    </div>
  );
};

export default ProfileLayout;
