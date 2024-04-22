import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/lib/utils";

export async function loader({ request }: LoaderArgs) {
  await authenticator.logout(request, { redirectTo: "/" });
}

const logout = () => {
  return <div>logout...</div>;
};

export default logout;
