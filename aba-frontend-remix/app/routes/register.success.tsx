import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";

export const loader = async ({ request }: LoaderArgs) => {
  const urlParams = new URLSearchParams(request.url.split("?")[1]);
  const sessionId = urlParams.get("session_id");

  if (!sessionId) {
    throw new Error("No session id found");
  }

  const user = await Api().payments.notifyPaymentSuccess(sessionId);

  return json({ user });
};

const RegisterSuccess = () => {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>
        {user.name} {user.surname} Verified
      </h2>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default RegisterSuccess;
