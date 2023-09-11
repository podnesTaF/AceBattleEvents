import { LoaderArgs } from "@remix-run/node";
import { adminAuthenticator } from "~/lib/utils";

export async function loader({ request }: LoaderArgs) {
  await adminAuthenticator.logout(request, { redirectTo: "/" });
}

const logout = () => {
  return <div>logout...</div>;
};

export default logout;
