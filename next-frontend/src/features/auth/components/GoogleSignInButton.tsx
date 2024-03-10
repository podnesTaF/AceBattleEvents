import { Button } from "@/src/shared/ui/button";
import Image from "next/image";

export const GoogleSignInButton = ({
  onGoogleSignIn,
  title = "Sign in with Google",
}: {
  onGoogleSignIn: () => void;
  title?: string;
}): JSX.Element => {
  return (
    <Button
      type={"button"}
      onClick={onGoogleSignIn}
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
        <span>{title}</span>
      </span>
    </Button>
  );
};
