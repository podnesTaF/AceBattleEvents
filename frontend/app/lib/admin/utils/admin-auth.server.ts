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
    return user;
  }),
  "admin-pass"
);
