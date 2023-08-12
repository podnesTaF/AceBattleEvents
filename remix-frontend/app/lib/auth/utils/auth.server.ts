import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { Api } from "~/api/axiosInstance";
import { IUser } from "~/lib/user/types/IUser";
import { sessionStorage } from "./session.server";

export let authenticator = new Authenticator<IUser>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let user = await Api().users.loginUser({
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
  "user-pass"
);
