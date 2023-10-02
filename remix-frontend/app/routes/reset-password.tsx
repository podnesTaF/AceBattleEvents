import { Button } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";

const ResetPasswordPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = async () => {
    if (activeTab === 0) {
      if (email) {
        const message = await Api().users.resetPasswordRequest(email);
        if (message) {
          setActiveTab(1);
        }
      }
    } else if (activeTab === 1) {
      navigate("/auth/login");
    }
  };
  return (
    <div className="h-calc-screen-lg flex justify-center items-center">
      <div className="max-w-lg p-4 rounded-md border-gray-300 border-[1px] shadow-md">
        {activeTab === 0 && (
          <div className="flex flex-col w-full gap-4 mb-4">
            <h3 className="text-xl md:texl-2xl text-center font-semibold">
              Enter email you registered on
            </h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-50 border shadow-sm text-gray-900 text-sm rounded-lg focus:border-[1px] outline-none block w-full p-2.5 focus:border-blue-500/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500/500 dark:focus:border-blue-500/50"
            />
          </div>
        )}
        {activeTab === 1 && (
          <div className="flex flex-col w-full gap-4 mb-4">
            <h3 className="text-xl md:texl-2xl text-center font-semibold">
              You will find a link to reset your password in your email!
            </h3>
            <p className="w-full">
              <a
                className="text-black underline text-md md:text-xl text-center"
                href="https://www.google.com"
                target="_blank"
              >
                Open email
              </a>
            </p>
          </div>
        )}
        <div className="flex justify-end w-full gap-6">
          <Button onClick={handleNext}>
            {activeTab === 0 ? "Next" : "Done"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
