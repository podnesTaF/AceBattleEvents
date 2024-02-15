import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="md:min-h-screen  flex flex-row py-8 px-4 md:py-0 md:px-0">
      <div className="md:w-1/2 xl:w-2/5 h-auto bg-white rounded-lg opacity-95 py-4 px-2 sm:px-5 sm:max-w-lg sm:mx-auto md:max-w-none">
        <div className="max-w-lg mx-4 sm:mx-auto h-full flex justify-center">
          <div className="flex flex-col gap-8  md:mx-auto">
            <Link href="/">
              <div className="flex gap-2 items-center text-red-500 mb-auto">
                <ArrowLeft size={24} />
                <h4 className="text-lg md:text-xl font-semibold">
                  Back to Ace Battle Mile
                </h4>
              </div>
            </Link>
            {children}
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-full h-full md:h-auto md:relative md:w-1/2 xl:w-3/5 -z-10">
        <Image
          src="/images/sunny-auth.jpg"
          height={1300}
          width={1300}
          alt="authentication"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
