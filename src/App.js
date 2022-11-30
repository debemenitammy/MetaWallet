import "./App.css";

import React, { useState } from "react";
import Ethereum from "./metawalletimage.jpeg";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const accountHandler = async (newAccount) => {
    const [address, balance] = await Promise.all([
      newAccount.getAddress(),
      newAccount.getBalance()
    ])
    setDefaultAccount(address);
    setUserBalance(ethers.utils.formatEther(balance));
    await getEtherBalance(address);
  };

  const connectwalletHandler = () => {
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("😃 Try Installing Metamask");
    }
  };
  

  const getEtherBalance = async (address) => {
    const balance = await provider.getBalance(address, "latest");
    return balance;
  };
  return (
    <div className="flex bg-slate-400 border h-screen pt-[10rem] border-solid border-black item-center justify-center">
      <div>
        <div className="flex item-center justify-center">
          <img
            src={Ethereum}
            className="w-[30rem] h-auto"
            alt="logo"
          />
        </div>
        <h2 className="text-[2rem] text-center font-bold text-white">💵 Welcome To MetaWallet 💵</h2>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-sm font-medium mt-3"
          onClick={connectwalletHandler}
        >
          {defaultAccount ? "Connected!!" : "Connect"}
        </button>
        { defaultAccount ? <div className="mt-2 shadow p-[2rem] bg-white text-[1.5rem] mt-3">
          <h4>Address:{defaultAccount}</h4>
          <div>
            <h3>Wallet Amount: {userBalance}</h3>
          </div>
        </div>: null}
        {errorMessage}
      </div>
    </div>
  );
};

export default App;
