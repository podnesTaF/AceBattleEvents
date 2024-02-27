"use client";

import { LoginFormSchema } from "@/app/(auth)/_lib/utils";
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
import { Switch } from "@/common/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const { data } = useSession();
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

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

  const onSubmit = async (dto: z.infer<typeof LoginFormSchema>) => {
    const result = await signIn("credentials", {
      email: dto.email,
      password: dto.password,
      rememberMe: dto.rememberMe,
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
    } else {
      let errorMessage = "An unexpected error occurred"; // Default message

      if (result?.error) {
        errorMessage = "Wrong email or password";
      }

      setErrorMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (data) {
      if (redirectUri !== "/") {
        window.location.href =
          "/login/redirect?redirectUri=" + redirectUri + "&newOtt=true";
      } else {
        window.location.href = "/";
      }
    }
  }, [data, redirectUri]);

  return (
    <>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-color-primary text-center">
          Nice to see you again!
        </h2>
        <p className="text-md md:text-lg text-color-secondary text-center">
          Join Ace Battle Mile to Participate in our fascinating game
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="px-3 md:px-5 py-6 md:py-6 xl:py-7 text-lg placeholder:text-md placeholder:md:text-lg font-medium placeholder:font-medium"
                      placeholder="Email"
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
                  <FormControl>
                    <Input
                      className="px-3 md:px-5 py-6 md:py-6 xl:py-7 text-lg placeholder:text-md placeholder:md:text-lg font-medium placeholder:font-medium"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Switch />
                      </FormControl>
                      <FormLabel>Remember me</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <a href="#" className="text-primary text-sm">
                Forgot password?
              </a>
            </div>
            <div className="w-full">
              <FormMessage>{errorMessage}</FormMessage>
            </div>
            <div className="flex flex-col gap-6 mt-3">
              <Button
                className="px-3 md:px-5 py-6 md:py-6 xl:py-7"
                type="submit"
              >
                Sign In
              </Button>
              <div className="bg-gray-200 w-full h-[2px]"></div>
              <Button
                type={"button"}
                onClick={signInWithGoogle}
                variant={"default"}
                className="px-3 md:px-5 py-6 md:py-6 xl:py-7 bg-primary hover:bg-primary/10"
              >
                <span className="flex items-center gap-2">
                  <Image
                    src="/icons/google.svg"
                    alt="google"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span>Sign in with Google</span>
                </span>
              </Button>
            </div>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-primary">
                Sign Up Now
              </a>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Login;
