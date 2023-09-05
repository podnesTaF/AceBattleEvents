const PageInDevelopment = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex gap-6 items-center">
        <img src="/warning-sign.png" width="300" />
        <h1 className="text-3xl md:text-5xl font-semibold text-red-500">
          Page in development
        </h1>
      </div>
    </div>
  );
};

export default PageInDevelopment;
