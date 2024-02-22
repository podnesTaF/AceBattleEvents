import { Api } from "@/api/axiosInstance";
import { auth } from "@/lib/auth/utils/auth";

export default async function ProfilePage() {
  const session = await auth();
  const user = await Api(session).users.getMe();

  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold">{user.email}</h2>
    </div>
  );
}
