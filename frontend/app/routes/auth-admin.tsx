import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { RemixForm } from "~/components/shared/forms/CustomForm";
import { adminAuthenticator, loginSchema } from "~/lib/utils";

export const action = async ({ request }: { request: Request }) => {
  return adminAuthenticator.authenticate("admin-pass", request, {
    successRedirect: "/admin",
    failureRedirect: "/auth-admin",
  });
};

export async function loader({ request }: LoaderArgs) {
  return await adminAuthenticator.isAuthenticated(request, {
    successRedirect: "/admin",
  });
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Admin Login" }];
};

const AdminAuthentication = () => {
  return (
    <div className="w-screen py-6 px-4 h-full md:h-[800px] flex justify-center items-center">
      <div className="py-4 px-2 md:px-4 lg:px-8 md:min-h-[600px] min-w-[250px] sm:min-w-[400px] flex flex-col justify-center">
        <h3 className="text-center text-2xl mb-4">Admin sign in</h3>
        <RemixForm schema={loginSchema}>
          {({ Field, Errors, Button }) => (
            <>
              <Field name="email">
                {({ Label, Errors }) => (
                  <>
                    <label htmlFor={"email"} className="block mb-2 ">
                      <div className="flex gap-2 items-center">
                        <p className="text-md lg:text-lg font-medium text-gray-900">
                          Email
                        </p>
                      </div>
                    </label>
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
                Enter Admin Panel
              </Button>
            </>
          )}
        </RemixForm>
      </div>
    </div>
  );
};

export default AdminAuthentication;
