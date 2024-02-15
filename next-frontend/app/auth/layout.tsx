import Image from "next/image";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="lg:h-screen flex">
      <div className="w-full md:w-1/2 xl:w-2/5 h-full bg-white">
        <div className="max-w-lg  mx-4 sm:mx-auto h-full flex  justify-center">
          {children}
        </div>
      </div>
      <div className="md:w-1/2 xl:w-3/5">
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
