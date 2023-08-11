import { createFormAction } from "remix-forms";
// For Remix, import it like this
import { json, redirect } from "@remix-run/node";
const formAction = createFormAction({ redirect, json });

export { formAction };
