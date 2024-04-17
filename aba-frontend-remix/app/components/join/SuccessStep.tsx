import { Button } from "@mui/material";
import { Link, useNavigate } from "@remix-run/react";
import { IUser } from "~/lib/types";

const SuccessStep = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center md:justify-start items-center h-full w-full gap-5">
      <img
        src="/icon-success.svg"
        className="w-20 h-20 md:w-40 md:h-40 object-contain object-center"
        alt="success"
      />
      <div>
        <h1 className="text-lg font-semibold text-green-600">
          Thank You, {user.name}!
        </h1>
        <p className="mt-4 text-center">
          Your payment was processed successfully. You're now a member of Ace
          Battle Association!
        </p>
      </div>
      <div className="mt-6 text-left">
        <h2 className="text-md font-semibold">What's Next?</h2>
        <ul className="list-inside list-disc">
          <li>
            Check your email (<strong>{user.email}</strong>) for your payment
            receipt and additional details.
          </li>
          <li>
            If you have any questions, feel free to{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              contact support
            </Link>
            .
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="w-full"
          onClick={() => navigate("/")}
          variant="outlined"
          color={"secondary"}
        >
          Home
        </Button>
        <Button
          className="w-full"
          onClick={() => navigate("/")}
          variant="contained"
          color={"secondary"}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SuccessStep;
