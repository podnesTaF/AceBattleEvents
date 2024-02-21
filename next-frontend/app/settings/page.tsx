import { auth } from "@/lib/auth/utils/auth";

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold">{session?.user.email}</h2>
    </div>
  );
}
