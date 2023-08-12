import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth/utils/auth.server";

export async function loader({ request }: LoaderArgs) {
  await authenticator.logout(request, { redirectTo: "/auth/login" });
}

const logout = () => {
  return <div>logout...</div>;
};

export default logout;
