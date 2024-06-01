import { loginSchema } from "@/src/entities/Auth/validation";
import { Button } from "@/src/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import { Switch } from "@/src/shared/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignInFormProps {
  onSignIn: (dto: z.infer<typeof loginSchema>) => void;
  errorMessage: string;
}

export const SignInForm = ({
  onSignIn,
  errorMessage,
}: SignInFormProps): JSX.Element => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-8">
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
            <Button className="px-3 md:px-5 py-6 md:py-6 xl:py-7" type="submit">
              Sign In
            </Button>
            <div className="bg-gray-200 w-full h-[2px]"></div>
          </div>
        </div>
      </form>
    </Form>
  );
};
