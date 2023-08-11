import { z } from "zod";
// For Remix, import it like this
import { Request } from "@remix-run/node";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "~/lib/shared/utils/form-action.server";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Wrong email")
    .min(1, { message: "Please, provide the email" }),
  password: z
    .string()
    .min(6, { message: "Password at least 6 characters" })
    .min(1, { message: "password is required" }),
});

const mutation = makeDomainFunction(loginSchema)(
  async (values) =>
    console.log(values) /* or anything else, like saveMyValues(values) */
);

export const action = async ({ request }: { request: Request }) => {
  return formAction({
    request,
    schema: loginSchema,
    mutation,
    successPath: `/` /* path to redirect on success */,
  });
};
