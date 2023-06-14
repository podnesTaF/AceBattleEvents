"use client";

import { useAppDispatch } from "@/hooks/useTyped";
import { addBalance } from "@/redux/features/userSlice";
import {
  useCreateTxMutation,
  useUpdateUserMutation,
} from "@/services/userService";
import { Checkbox, FormControlLabel } from "@mui/material";
import { red } from "@mui/material/colors";
import { ethers } from "ethers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ConnectButton } from "web3uikit";
import { abi } from "../../constants";
import { chainAddress } from "../../utils/web3-helpers";

const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || "";

const page = () => {
  const { data: session, status, update } = useSession();
  const [balance, setBalance] = useState<any>(0);
  const [updateBalance, { data }] = useUpdateUserMutation();
  const [createTx, { data: txData }] = useCreateTxMutation();
  const [toAdd, setToAdd] = useState("");
  const { chainId: inHex, account } = useMoralis();
  const dispatch = useAppDispatch();
  // @ts-ignore
  const runAddress = chainAddress(inHex);

  const handleAddBalance = useCallback(async () => {
    await fund({
      onSuccess: async () => {
        if (toAdd && +toAdd > 0 && session) {
          try {
            await createTx({ amount: +toAdd, type: "DEBIT" });
            await updateBalance({ balance: +toAdd });
            dispatch(addBalance(+toAdd));
            update({
              ...session,
              user: { ...session.user, balance: session.user.balance + +toAdd },
            });
            setToAdd("");
          } catch (error) {
            console.log(error);
          }
        }
      },
      onError: (error) => console.log(error),
    });
  }, [toAdd, session]);

  // const value = ethers.utils.parseEther((+toAdd * 0.01).toFixed(2)),

  const {
    runContractFunction: fund,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: runAddress,
    functionName: "fund",
    params: {},
    msgValue: ethers.utils.parseEther(+toAdd * 0.01 + "") as any,
  });

  const { runContractFunction: withdraw } = useWeb3Contract({
    abi: abi,
    contractAddress: runAddress,
    functionName: "withdraw",
    params: {},
  });

  const { runContractFunction: getBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: runAddress,
    functionName: "getBalance",
    params: {},
  });

  const { runContractFunction: buyRegistration } = useWeb3Contract({
    abi: abi,
    contractAddress: runAddress,
    functionName: "buy",
    params: {
      sender: account,
      date: Date.now(),
      sum: ethers.utils.parseEther(+toAdd * 0.01 + "") as any,
    },
  });

  const { runContractFunction: getMyTx } = useWeb3Contract({
    abi: abi,
    contractAddress: runAddress,
    functionName: "getMyTransactions",
    params: {},
  });

  const handleBuy = async () => {
    const tx = await buyRegistration();
    console.log(tx);
  };

  useEffect(() => {
    const getTx = async () => {
      const tx = await getMyTx();
      console.log(tx);
    };

    if (account) {
      getTx();
    }
  }, [account]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center relative h-40 md:h-60 bg-[url('/add-coins-intro.jpg')] bg-cover bg-center">
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
        <h2 className="text-3xl md:text-4xl text-white z-10 uppercase font-semibold">
          top up the balance
        </h2>
      </div>
      <div className="max-w-7xl w-full md:mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-around items-center md:items-start gap-6">
          <div className="my-4 w-[350px] sm:w-[400px] lg:w-2/5">
            <h3 className="text-2xl z-10 uppercase font-semibold mb-4">
              Add coins
            </h3>
            <div className="my-3">
              <button
                className="p-3"
                onClick={async () => {
                  await withdraw({
                    onSuccess: async () => {
                      console.log("success");
                    },
                    onError: (error) => console.log("withdraw error"),
                  });
                }}
              >
                Withdraw
              </button>
            </div>
            <div className="w-full runded-md shadow-md">
              <div className="rounded-t-md p-3 bg-red-600">
                <h3 className="text-white text-xl font-semibold">Sum</h3>
              </div>
              <div className="flex flex-col lg:flex-row px-4 my-3 md:px-5 gap-3 w-full justify-around">
                <div className="my-2">
                  <input
                    value={toAdd}
                    onChange={(e) => setToAdd(e.target.value)}
                    type={"text"}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="BC"
                  />
                </div>
                <div className="my-2">
                  <input
                    value={+toAdd * 0.01 < 0 ? "" : (+toAdd * 0.01).toFixed(2)}
                    onChange={(e) => setToAdd(+e.target.value * 0.01 + "")}
                    type={"text"}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="ETH"
                  />
                </div>
                <div className="my-2">
                  <input
                    type={"text"}
                    value={+toAdd * 50 < 0 ? "" : +toAdd * 50 + ""}
                    onChange={(e) => setToAdd(+e.target.value * 0.02 + "")}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="Eu"
                  />
                </div>
              </div>
              <div className="px-4 mt-3 pb-4 md:px-5 flex flex-col items-end justify-start">
                <div className="mb-2 w-full">
                  <FormControlLabel
                    label="I agree this policies and agreements"
                    control={
                      <Checkbox
                        sx={{
                          color: red[500],
                          "&.Mui-checked": {
                            color: red[700],
                          },
                        }}
                      />
                    }
                  />
                </div>
                <button
                  onClick={handleAddBalance}
                  className="hover:bg-slate-800 bg-black text-white font-bold py-2 px-4 border border-slate-800 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="my-4">
            <h3 className="text-2xl z-10 uppercase font-semibold mb-4">
              Your wallet
            </h3>
            {account ? (
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
            ) : (
              <div className="h-[200px] w-[350px] sm:h-[270px] sm:w-[480px] flex flex-col">
                <p className="text-xl mb-6">
                  You have no wallet connected. Add your wallet to proceed
                  payments
                </p>
                <ConnectButton />
                {/* <button className="w-full shadow-md rounded-md bg-gradient-to-b from-purple-700 via-red-600 to-orange-400 text-xl text-white font-semibold py-3 hover:opacity-90 active:scale-95">
                  Add wallet
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
