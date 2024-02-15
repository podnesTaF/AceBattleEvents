import Navbar from "@/components/common/navbar/Navbar";

export default function Home() {
  return (
    <>
      <div className="fixed w-full left-0 top-0  flex justify-center pt-4 z-10">
        <Navbar />
      </div>
      <div>
        <div className="h-screen w-full bg-[url('/images/brussels-preview.jpg')] bg-no-repeat bg-cover relative">
          <div className="absolute top-0 w-full bg-gradient-to-b from-black to-transparent h-48 left-1/2 -translate-x-1/2"></div>
          <div className="absolute bottom-0 w-2/3 bg-gradient-to-b from-transparent to-black h-48 left-1/2 -translate-x-1/2"></div>
        </div>
        <div className="bg-gray-900">
          <h1 className="text-6xl text-white font-bold text-center mt-24">
            Ace Battle Mile
          </h1>
          <h2 className="text-3xl text-white font-semibold text-center mt-4">
            The Ultimate Running Experience
          </h2>
          <div className="flex justify-center mt-12">
            <button className="bg-red-500 text-white text-xl px-12 py-3 rounded-[30px]">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
