import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const connectToWallet = async (erc20List, setErc20List) => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const walletAddress = await signer.getAddress();
  // console.log('Wallet Address: ', walletAddress);

  let walletBalance = await provider.getBalance(walletAddress);
  walletBalance = ethers.utils.formatEther(walletBalance);
  // console.log('Balance: ', walletBalance);

  setErc20List([
    ...erc20List,
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: walletBalance,
    },
  ]);

  return { walletAddress, walletBalance, provider, signer };
};
