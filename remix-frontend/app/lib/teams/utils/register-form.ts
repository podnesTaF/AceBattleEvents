import { createForm } from "remix-forms";
import { z } from "zod";
// For Remix, import it like this
import { ActionFunction } from "@remix-run/node";
import {
  Form as FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "./register-form-action.server";

export const Form = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

export const registerTeamSchema = z.object({
  teamId: z.number(),
  agreement: z.boolean(),
});

const mutation = makeDomainFunction(registerTeamSchema)(
  async (values) =>
    console.log(values) /* or anything else, like saveMyValues(values) */
);

export const action: ActionFunction = async ({ request, params }) => {
  const { eventId } = params;
  return formAction({
    request,
    schema: registerTeamSchema,
    mutation,
    successPath: `events/${eventId}/register-team/success` /* path to redirect on success */,
  });
};
