"use client";

import AgreeCheck from "@/components/shared/AgreeCheck";
import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import FormRadio from "@/components/shared/FormRadio";
import FormSelect from "@/components/shared/FormSelect";
import { IUser } from "@/models/IUser";
import { countries } from "@/utils/events-filter-values";
import { RegisterSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RegisterPage = () => {
  const router = useRouter();
  const [isRunner, setIsRunner] = useState<boolean>(false);
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (dto: any) => {
    try {
      const { data } = await axios.post<any, { data: IUser }>(
        "http://localhost:4000/api/v1/auth/register",
        dto
      );
      if (data.id) {
        router.push("/auth/login");
      }
    } catch (e) {
      console.log(e);
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
            <Link href="auth/login" className="underline text-red-500">
              Sign in
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterPage;
