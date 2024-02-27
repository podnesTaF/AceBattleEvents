"use client";

import { Api } from "@/api/axiosInstance";
import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../_lib/utils";

const SignUp = () => {
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    if (values.confirm !== values.password) {
      form.setError("confirm", {
        type: "manual",
        message: "Password does not match",
      });

      return;
    }

    try {
      const user = await Api().users.register(values);

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        rememberMe: true,
        redirect: false,
        callbackUrl: "/signup/confirm-email",
      });

      if (result && !result.error && result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      form.setError("root", {
        type: "manual",
        message:
          error?.response?.data?.message ||
          "An error occurred while registering user",
      });
    }
  }

  const signInWithGoogle = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl:
        redirectUri !== "/"
          ? `${
              process.env.PLATFORM_URL
            }/api/auth/callback?redirectUri=${encodeURIComponent(redirectUri)}`
          : "/",
    });

    if (result && !result.error && result.url) {
      if (redirectUri !== "/") {
        window.location.href = "/login/redirect?redirectUri=" + redirectUri;
      } else {
        window.location.href = result.url;
      }
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-color-primary text-center">
          Welcome!
        </h2>
        <p className="text-md md:text-lg text-color-secondary text-center">
          Join Ace Battle Mile to Participate in our fascinating game
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="px-3 md:px-4 py-4 md:py-4 xl:py-5 placeholder:text-sm font-medium "
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        className="px-3 md:px-4 py-4 md:py-4 xl:py-5 placeholder:text-sm font-medium "
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="px-3 md:px-4 py-4 md:py-4 xl:py-5 placeholder:text-sm font-medium "
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="px-3 md:px-4 py-4 md:py-4 xl:py-5 placeholder:text-sm font-medium "
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="px-3 md:px-4 py-4 md:py-4 xl:py-5 placeholder:text-sm font-medium "
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-2">
              <FormMessage className="text-lg">
                {form.formState.errors.root?.message}
              </FormMessage>
            </div>
            <div className="flex flex-col gap-6 mt-3">
              <Button
                className="px-3 md:px-4 py-4 lg:py-6 font-semibold text-lg"
                type="submit"
              >
                Sign Up
              </Button>
              <div className="bg-gray-200 w-full h-[2px]"></div>
              <Button
                type="button"
                onClick={signInWithGoogle}
                className="px-3 md:px-4 py-4 lg:py-5 md:py-6 xl:py-7"
              >
                <span className="flex items-center gap-2">
                  <Image
                    src="/icons/google.svg"
                    alt="google"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span>Sign up with Google</span>
                </span>
              </Button>
            </div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="text-primary">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUp;
