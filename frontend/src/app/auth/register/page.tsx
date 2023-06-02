"use client";

import AgreeCheck from "@/components/shared/AgreeCheck";
import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import { IUser } from "@/models/IUser";
import { RegisterSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const RegisterPage = () => {
  const router = useRouter();
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
          <FormField
            name="club"
            label="Club"
            placeholder="Enter your club (optional)"
          />
          <div className="flex gap-3 w-full">
            <FormField name="city" label="City" placeholder="Enter your city" />
            <FormField
              name="country"
              label="Country"
              placeholder="Choose country"
            />
          </div>
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
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterPage;
