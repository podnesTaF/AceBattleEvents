import AppBar from "@/common/components/navbar/AppBar";
import { auth } from "../(auth)/_lib/utils/auth";

const AthletesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div>
      <AppBar session={session} />
      <>
        <header className="w-full bg-[url('/images/auth-intro.jpg')] bg-cover bg-no-repeat bg-center h-[200px] relative flex items-end">
          <div className="w-full absolute bg-gradient-to-b from-transparent via-transparent to-black h-full left-0"></div>
          <div className="max-w-6xl w-full px-4 lg:px-0 lg:mx-auto py-4 flex gap-4 items-center justify-start mt-auto z-10">
            <div className="bg-red-500 w-4 h-12"></div>
            <h3 className="text-white text-2xl font-semibold">
              Athletes&apos; Profiles
            </h3>
          </div>
        </header>
        <main className="max-w-6xl mx-4 lg:mx-auto my-6">
          <h3>Participants / Athletes</h3>
          {children}
        </main>
      </>
    </div>
  );
};

export default AthletesLayout;
