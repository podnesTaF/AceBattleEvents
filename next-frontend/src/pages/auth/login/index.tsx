import {
  GoogleSignInButton,
  SignInForm,
  useGoogleSignIn,
  useSignIn,
} from "@/src/features/auth";

const Login = () => {
  const { signIn, errorMessage } = useSignIn();
  const { signInWithGoogle } = useGoogleSignIn();

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
      <SignInForm onSignIn={signIn} errorMessage={errorMessage} />
      <GoogleSignInButton onGoogleSignIn={signInWithGoogle} />
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-primary">
          Sign Up Now
        </a>
      </p>
    </div>
  );
};

export default Login;
