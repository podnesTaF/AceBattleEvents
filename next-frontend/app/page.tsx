import { auth } from "@/app/(auth)/_lib/utils/auth";
import Navbar from "@/common/components/navbar/Navbar";
import EventPreview from "./(home)/_components/EventPreview";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <div className="fixed w-full left-0 top-0  flex justify-center pt-4 z-50">
        <Navbar session={session} />
      </div>
      <main>
        <EventPreview />
      </main>
    </>
  );
}

