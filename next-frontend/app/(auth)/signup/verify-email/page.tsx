import { Api } from "@/api/axiosInstance";
import Link from "next/link";

const VerifyEmail = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const ott = searchParams?.ott as string;

  await Api().users.verifyEmail(ott);

  return (
    <div>
      <h1>Email verified</h1>
      <p>Your email has been verified. </p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default VerifyEmail;
