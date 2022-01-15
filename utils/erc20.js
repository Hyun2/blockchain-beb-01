import { ethers } from "ethers";
import erc20Token from "../build/contracts/SimpleToken.json";

export const addNewErc20Token = async (provider, tokenContractAddress, walletAddress, erc20List, setErc20List) => {
  const tokenContract = new ethers.Contract(tokenContractAddress, erc20Token.abi, provider);
  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  let balance = await tokenContract.balanceOf(walletAddress);
  balance = ethers.utils.formatUnits(balance, 18);
  setErc20List([...erc20List, { name, symbol, balance, tokenContractAddress }]);
  // return;
};

export const updateErc20TokenBalance = async (
  provider,
  tokenContractAddress,
  walletAddress,
  erc20List,
  setErc20List,
) => {
  const tokenContract = new ethers.Contract(tokenContractAddress, erc20Token.abi, provider);
  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  let balance = await tokenContract.balanceOf(walletAddress);
  balance = ethers.utils.formatUnits(balance, 18);

  setErc20List(
    erc20List.map((token) => {
      if (token.tokenContractAddress === tokenContractAddress) {
        return { name, symbol, balance, tokenContractAddress };
      } else return token;
    }),
  );
  // return;
};

export const transferErc20 = async ({
  provider,
  signer,
  walletAddress,
  recipientAddress,
  tokenAmount,
  selectedErc20,
  erc20List,
  setErc20List,
}) => {
  // let gas_limit = "0x100000";

  // const currentGasPrice = await provider.getGasPrice();
  // let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
  // console.log(`gas_price: ${gas_price}`);
  if (selectedErc20?.tokenContractAddress) {
    // general token send
    let contract = new ethers.Contract(selectedErc20?.tokenContractAddress, erc20Token.abi, signer);

    // How many tokens?
    let numberOfTokens = ethers.utils.parseUnits(tokenAmount, 18);

    // Send tokens
    const transaction = await contract.transfer(recipientAddress, numberOfTokens);
    let tx = await transaction.wait();
    const event = tx.events.find((event) => event.event === "Transfer");
    if (event) {
      updateErc20TokenBalance(provider, selectedErc20?.tokenContractAddress, walletAddress, erc20List, setErc20List);
    }
  } // ether send
  else {
    const tx = {
      from: walletAddress,
      to: recipientAddress,
      value: ethers.utils.parseEther(tokenAmount),
      // gasLimit: ethers.utils.hexlify(gas_limit), // 100000
      // gasPrice: gas_price,
    };
    console.dir(tx);
    try {
      signer.sendTransaction(tx).then((transaction) => {
        console.dir(transaction);
        alert("Send finished!");
      });
    } catch (error) {
      alert("failed to send!!");
    }
  }
};
