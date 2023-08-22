import { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { RemixForm } from "~/components/shared/forms/CustomForm";
import { authenticator, loginSchema } from "~/lib/utils";

export const action = async ({ request }: { request: Request }) => {
  return authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  });
};

export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

const LoginPage = () => {
  return (
    <div className="py-4 px-2 md:px-4 lg:px-8 md:min-h-[600px] min-w-[250px] sm:min-w-[400px] flex flex-col justify-center">
      <h3 className="text-center text-2xl mb-4">Sign in</h3>
      <RemixForm schema={loginSchema}>
        {({ Field, Errors, Button }) => (
          <>
            <Field name="email">
              {({ Label, Errors }) => (
                <>
                  <Label />
                  <input
                    name={"email"}
                    type={"email"}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder={"enter your email"}
                  />
                  <Errors className="text-red-500 text-sm" />
                </>
              )}
            </Field>
            <Field name="password">
              {({ Label, Errors }) => (
                <>
                  <Label />
                  <input
                    name={"password"}
                    type={"password"}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder={"enter your password"}
                  />
                  <Errors className="text-red-500 text-sm" />
                </>
              )}
            </Field>
            <Errors />
            <Button className="text-white text-lg uppercase w-full my-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-2 py-1 md:px-3 md:py-2  text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center justify-center disabled:bg-green-200">
              Connect battle mile
            </Button>
          </>
        )}
      </RemixForm>
      <p>
        Don't have an account yet?{" "}
        <Link to="/auth/register" className="underline text-red-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
