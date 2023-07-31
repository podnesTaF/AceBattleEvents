"use client";

import FormButton from "@/components/shared/FormButton";
import FormField from "@/components/shared/FormField";
import { LoginFormSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const email = useRef("");
  const pass = useRef("");

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: any) => {
    const result = await signIn("credentials", {
      email: dto.email,
      password: dto.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="py-4 px-2 md:px-4 lg:px-8 md:min-h-[600px] min-w-[250px] sm:min-w-[400px] flex flex-col justify-center">
      <h3 className="text-center text-2xl mb-4">Sign in</h3>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <FormField
            name="password"
            type="password"
            placeholder="enter a password"
            label="Password"
          />
          <FormButton
            title="Connect to Ace Battle Events"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
          />
          <p>
            Don't have an account yet?{" "}
            <Link href="auth/register" className="underline text-red-500">
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
    // <div
    //   className={
    //     "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
    //   }
    // >
    //   <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
    //     <FormField
    //       lableText="Email"
    //       onChange={(e) => (email.current = e.target.value)}
    //     />
    //     <FormField
    //       lableText="Password"
    //       type={"password"}
    //       onChange={(e) => (pass.current = e.target.value)}
    //     />
    //     <Button onClick={onSubmit}>Login</Button>
    //   </div>
    // </div>
  );
};

export default LoginPage;
