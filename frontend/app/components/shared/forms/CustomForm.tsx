import type { FormProps, FormSchema } from "remix-forms";
import { createForm } from "remix-forms";
// For Remix, import it like this
import {
  Form as FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import CustomInput from "./CustomInput";

export const RemixForm = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

function CustomForm<Schema extends FormSchema>(props: FormProps<Schema>) {
  return <RemixForm<Schema> inputComponent={typeof CustomInput} {...props} />;
}

export { CustomForm };
