import { auth } from "@/src/entities/Auth/utils";
import { UserApi } from "@/src/entities/User";
import UserSettings from "@/src/pages/profile/settings/UserSettings";

export default async function ProfilePage() {
  const session = await auth();
  const userApi = new UserApi(session);
  const user = await userApi.getMe();

  if (!session || !user) return null;

  return <UserSettings session={session} user={user} />;
}
