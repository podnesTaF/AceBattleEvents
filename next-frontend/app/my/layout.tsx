import MyNavbar from "@/components/my/MyNavbar";
import { auth } from "@/lib/auth/utils/auth";

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
