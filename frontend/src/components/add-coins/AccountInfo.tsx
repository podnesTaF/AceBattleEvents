import { Skeleton } from "@mui/material";
import Image from "next/image";
import React from "react";
import { ConnectButton } from "web3uikit";

interface AccountInfoProps {
  account: string | null;
  isWeb3Enabled?: boolean;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  if (account) {
    return (
      <div className="shadow-md rounded-md bg-gradient-to-b from-purple-700 via-red-600 to-orange-400 h-[200px] w-[350px] sm:h-[270px] sm:w-[480px]  p-4 flex flex-col relative">
        <p className="text-white text-xl font-semibold flex-1">
          {account.slice(0, 6)}...{account.slice(-4)}
        </p>
        <Image
          src="/ether.svg"
          width={26}
          height={43}
          alt="ether"
          className="ml-auto absolute bottom-4 right-4"
        />
        <div className="my-2">
          <ConnectButton />
        </div>
      </div>
    );
  }

  if (account === null)
    return (
      <div className="h-[200px] w-[350px] sm:h-[270px] sm:w-[480px] flex flex-col">
        <p className="text-xl mb-6">
          You have no wallet connected. Add your wallet to proceed payments
        </p>
        <ConnectButton />
      </div>
    );

  return (
    <div className="shadow-md rounded-md bg-gradient-to-b from-purple-700 via-red-600 to-orange-400 h-[200px] w-[350px] sm:h-[270px] sm:w-[480px]  p-4 flex flex-col relative">
      <Skeleton variant="text" width={180} height={24} animation="wave" />
      <Skeleton
        variant="rectangular"
        width={240}
        height={30}
        animation="wave"
        className="mt-auto"
      />
      <div className="my-2 hidden">
        <ConnectButton />
      </div>
    </div>
  );
};

export default AccountInfo;
