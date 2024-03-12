import MyNavbar from "@/common/components/navbar/MyNavbar";
import { auth } from "@/src/entities/Auth/utils";

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
