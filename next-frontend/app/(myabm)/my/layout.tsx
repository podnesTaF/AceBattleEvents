import { auth } from "@/app/(auth)/_lib/utils/auth";
import MyNavbar from "@/common/components/navbar/MyNavbar";

const MyAceBattleMileLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  return (
    <div className="bg-background">
      <MyNavbar session={session} />
      {children}
    </div>
  );
};

export default MyAceBattleMileLayout;
