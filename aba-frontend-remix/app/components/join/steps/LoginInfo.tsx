import { FormField } from "~/components/shared";

const LoginInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2 lg:gap-5 2xl:gap-[5%]">
        <FormField
          className="w-full"
          name={"email"}
          label="Email"
          placeholder="e.g example@example.com"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 lg:gap-5 2xl:gap-[5%]">
        <FormField
          className="w-full"
          type="password"
          name={"password"}
          label="Password"
          placeholder="Please enter your password"
        />
        <FormField
          className="w-full"
          type="password"
          name={"confirmPassword"}
          label="Confirm Password"
          placeholder="Please confirm your password"
        />
      </div>
    </div>
  );
};

export default LoginInfo;
