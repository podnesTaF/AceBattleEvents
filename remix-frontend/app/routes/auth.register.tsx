import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import AgreeCheck from "~/components/shared/forms/AgreeCheck";
import FormButton from "~/components/shared/forms/FormButton";
import FormField from "~/components/shared/forms/FormField";
import FormRadio from "~/components/shared/forms/FormRadio";
import FormSelect from "~/components/shared/forms/FormSelect";
import { RegisterSchema } from "~/lib/auth/utils/register-form";
import { countries } from "~/lib/shared/data/countries";
import { badRequest } from "~/lib/shared/utils/request.server";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isRunner, setIsRunner] = useState<boolean>(false);
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (dto: any) => {
    try {
      const user = await Api().users.registerUser(dto);
      if (!user) {
        return badRequest({
          fieldErrors: null,
          formError: "Username/Password combination is incorrect",
        });
      }
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-4 px-2 md:px-4 lg:px-8">
      <h3 className="text-center text-2xl mb-4">Sign up</h3>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            label="First name*"
            placeholder="Enter your name"
          />
          <FormField
            name="surname"
            label="Surname*"
            placeholder="Enter your surname"
          />
          <FormField
            name="email"
            label="Email*"
            placeholder="Enter your email"
          />
          <FormSelect
            name={"role"}
            label={"Your role*"}
            placeholder={"Choose role"}
            values={Object.entries({
              runner: "Runner",
              manager: "Manager",
              coach: "Coach",
            })}
            onChangeFilter={(value) => setIsRunner(value === "runner")}
          />
          <div className="flex gap-4 w-full">
            <div className="w-full">
              <FormField
                name="city"
                label="City*"
                placeholder="Enter your city"
              />
            </div>
            <div className="w-full">
              <FormSelect
                name={"country"}
                label={"Country*"}
                placeholder={"Choose country"}
                values={Object.entries(countries)}
                onChangeFilter={() => {}}
              />
            </div>
          </div>
          {isRunner && (
            <>
              <div className="flex gap-4 w-full mt-4">
                <div className="w-full">
                  <h3 className="text-xl">Gender</h3>
                  <FormRadio
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    name={`${name}.gender`}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    label="Date Of Birth*"
                    mask="99/99/9999"
                    name={`${name}.dateOfBirth`}
                    placeholder={"dd/mm/yyyy"}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  label="World Athletics URL"
                  name={`${name}.worldAthleticsUrl`}
                  placeholder={"Enter World Athletics URL here..."}
                  type="url"
                />
              </div>
            </>
          )}
          <FormField
            name="password"
            type="password"
            placeholder="enter a password"
            label="Password*"
          />
          <AgreeCheck message="I agree with rules and terms of “Ace Battle Event”" />
          <FormButton
            title="Connect to Ace Battle Events"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
          />
          <p>
            Already have an account?{" "}
            <Link to="auth/login" className="underline text-red-500">
              Sign in
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterPage;
