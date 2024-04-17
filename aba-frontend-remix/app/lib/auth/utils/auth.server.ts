import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { Api } from "~/api/axiosInstance";
import { AuthenticatedUser } from "~/lib/user/types/IUser";
import { sessionStorage } from "./session.server";

export let authenticator = new Authenticator<AuthenticatedUser>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let user = await Api().users.loginUser({
      email: email,
      password: password,
    });
    return user;
  }),
  "user-session"
);
