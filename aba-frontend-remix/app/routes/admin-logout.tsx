import { LoaderFunctionArgs } from "@remix-run/node";
import { adminAuthenticator } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  await adminAuthenticator.logout(request, { redirectTo: "/" });
}

const logout = () => {
  return <div>logout...</div>;
};

export default logout;
