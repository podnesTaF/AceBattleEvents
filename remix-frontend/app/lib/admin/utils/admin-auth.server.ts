import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { Api } from "~/api/axiosInstance";
import { IAdmin } from "~/lib/types";
import { adminSessionStorage } from "./admin-session-storage";

export let adminAuthenticator = new Authenticator<IAdmin>(adminSessionStorage);

adminAuthenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let user = await Api().admin.loginAdmin({
      email: email,
      password: password,
    });
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "admin-pass"
);
