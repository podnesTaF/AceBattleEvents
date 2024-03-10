import { registerSchema } from "@/src/entities/Auth/validation";
import { Button } from "@/src/shared/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export const SignUpForm = ({
  onSignUp,
  form,
}: {
  onSignUp: (dto: z.infer<typeof registerSchema>) => void;
  form: ReturnType<typeof useForm<z.infer<typeof registerSchema>>>;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-8">
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
          </div>
        </div>
      </form>
    </Form>
  );
};
