import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { RemixForm } from "~/components/shared/forms/CustomForm";
import { authenticator, loginSchema } from "~/lib/utils";

export const action = async ({ request }: { request: Request }) => {
  return authenticator.authenticate("user-session", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login?error=Invalid credentials",
  });
};

export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  const error = new URL(request.url).searchParams.get("error");

  return { error };
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Login" }];
};

const LoginPage = () => {
  const { error } = useLoaderData<typeof loader>();
  return (
    <div className="p-4 bg-white/80 border-2 border-gray-300 rounded-md min-h-[500px] sm:min-h-[600px] mx-5 w-full sm:w-[600px] sm:mx-auto flex flex-col items-center">
      <img
        src="/abm-logo-black.svg"
        alt="logo"
        className="w-[150px] h-[140px] md:w-[200px] md:h-[190px]"
      />
      <div className="mx-4 sm:mx-auto w-max sm:w-[450px]">
        <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
          Sign in
        </h3>
        <RemixForm schema={loginSchema}>
          {({ Field, Errors, Button }) => (
            <>
              <Field name="email">
                {({ Label, Errors }) => (
                  <div className="mb-2">
                    <label htmlFor={"email"} className="block mb-2 ">
                      <div className="flex gap-2 items-center">
                        <MailOutlineIcon />
                        <p className="text-md lg:text-lg font-medium text-gray-900">
                          Email
                        </p>
                      </div>
                    </label>
                    <input
                      name={"email"}
                      type={"email"}
                      className="flex-1 bg-gray-50 border shadow-sm text-gray-900 text-sm rounded-lg focus:border-[1px] outline-none block w-full p-2.5 focus:border-blue-500/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500/500 dark:focus:border-blue-500/50"
                      placeholder={"enter your email"}
                    />
                    <Errors className="text-red-500 text-sm" />
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ Label, Errors }) => (
                  <div className="mb-2">
                    <label htmlFor={"password"} className="block mb-2 ">
                      <div className="flex gap-2 items-center">
                        <LockOpenIcon />
                        <p className="text-md lg:text-lg font-medium text-gray-900">
                          Password
                        </p>
                      </div>
                    </label>
                    <input
                      name={"password"}
                      type={"password"}
                      className="flex-1 bg-gray-50 border shadow-sm text-gray-900 text-sm rounded-lg focus:border-[1px] outline-none block w-full p-2.5 focus:border-blue-500/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500/500 dark:focus:border-blue-500/50"
                      placeholder={"enter your password"}
                    />
                    <Errors className="text-red-500 text-sm" />
                  </div>
                )}
              </Field>
              <Errors />
              <Button className="text-white text-lg uppercase w-full my-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-2 py-1 md:px-3 md:py-2  text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center justify-center disabled:bg-green-200">
                Connect ABM
              </Button>
            </>
          )}
        </RemixForm>
        <p>
          Don't have an account yet?{" "}
          <Link to="/join-us" className="underline text-blue-400">
            Join us
          </Link>
        </p>
        <p className="mt-3">
          Forgot password?{" "}
          <Link to="/reset-password" className="underline text-red-500">
            Reset password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
