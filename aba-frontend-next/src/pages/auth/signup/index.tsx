import {
  GoogleSignInButton,
  SignUpForm,
  useGoogleSignIn,
  useSignUp,
} from "@/src/features/auth";

const SignUp = () => {
  const { onSignUp, form } = useSignUp();
  const { signInWithGoogle } = useGoogleSignIn();

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
      <SignUpForm onSignUp={onSignUp} form={form} />
      <GoogleSignInButton
        title="Sign up with Google"
        onGoogleSignIn={signInWithGoogle}
      />
      <p className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="text-primary">
          Sign In
        </a>
      </p>
    </>
  );
};

export default SignUp;
