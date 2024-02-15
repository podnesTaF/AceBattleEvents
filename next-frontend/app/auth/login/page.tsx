"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { loginSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-6 justify-center h-full mx-auto max-w-sm">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-color-primary">
          Nice to see you again!
        </h2>
        <p className="text-color-secondary">
          With cross-fit factory you will access to all necessary learning
          materials and special programs!
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="remember"
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
            <Button type="submit">Sign In</Button>
            <div className="bg-gray-200 w-full h-[2px]"></div>
            <Button className="bg-accent">
              <span className="flex items-center gap-2">
                <Image
                  src="/images/google.svg"
                  alt="google"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>Sign in with Google</span>
              </span>
            </Button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-primary">
                Sign Up Now
              </a>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
