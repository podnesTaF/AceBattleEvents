import { auth } from "@/app/(auth)/_lib/utils/auth";
import Navbar from "@/common/components/navbar/Navbar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <>
      <div className="fixed w-full left-0 top-0  flex justify-center pt-4 z-20">
        <Navbar session={session} />
      </div>
      {children}
    </>
  );
};

export default layout;
