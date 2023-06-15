"use client";

import AccountInfo from "@/components/add-coins/AccountInfo";
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
import { useCallback, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../../constants";
import { chainAddress } from "../../utils/web3-helpers";

const page = () => {
  const { data: session, update } = useSession();
  const [updateBalance] = useUpdateUserMutation();
  const [createTx] = useCreateTxMutation();
  const [toAdd, setToAdd] = useState("");
  const { chainId: inHex, account, isWeb3Enabled } = useMoralis();
  const dispatch = useAppDispatch();
  // @ts-ignore
  const runAddress = chainAddress(inHex);

  const handleAddBalance = useCallback(async () => {
    if (!session || !account) return;
    await fund({
      onSuccess: async (tx: any) => {
        if (toAdd && +toAdd > 0 && session) {
          try {
            await createTx({ amount: +toAdd, type: "DEBIT", txHash: tx.hash });
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
            <div className={`w-full runded-md shadow-md relative`}>
              {!account && (
                <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center z-10">
                  <h3 className="text-2xl font-semibold">
                    Connect to your wallet
                  </h3>
                </div>
              )}
              <div className="rounded-t-md p-3 bg-red-600">
                <h3 className="text-white text-xl font-semibold">Sum</h3>
              </div>
              <div
                className={`flex flex-col lg:flex-row px-4 my-3 md:px-5 gap-3 w-full justify-around ${
                  !account && "blur-sm"
                }`}
              >
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
              <div
                className={`px-4 mt-3 pb-4 md:px-5 flex flex-col items-end justify-start ${
                  !account && "blur-sm"
                }`}
              >
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
                  disabled={isLoading || isFetching}
                  onClick={handleAddBalance}
                  className="hover:bg-slate-800 bg-black text-white font-bold py-2 px-4 border border-slate-800 rounded disabled:opacity-70"
                >
                  {(isLoading || isFetching) && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="my-4">
            <h3 className="text-2xl z-10 uppercase font-semibold mb-4">
              Your wallet
            </h3>
            <AccountInfo isWeb3Enabled={isWeb3Enabled} account={account} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
