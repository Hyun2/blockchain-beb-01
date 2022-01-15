import { ethers } from "ethers";
import erc721Token from "../build/contracts/tozauNFT.json";

export const AddNewErc721Token = async (provider, tokenContractAddress, walletAddress, erc721List, setErc721List) => {
  // console.log(tokenContractAddress);
  const tokenContract = new ethers.Contract(tokenContractAddress, erc721Token.abi, provider);
  // console.log(tokenContract);
  console.log(walletAddress);
  console.log(tokenContract);
  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  let totalSupply = await tokenContract.totalSupply();
  totalSupply = totalSupply.toString();
  console.log(name, symbol, totalSupply);

  let totalTokenCounts = [];
  for (let i = 1; i <= totalSupply; i++) {
    totalTokenCounts.push(i);
  }
  console.log(totalTokenCounts);
  const toAddTokens = [];
  for (let tokenId of totalTokenCounts) {
    let tokenOwner = await tokenContract.ownerOf(tokenId);
    if (String(tokenOwner).toLocaleLowerCase() === walletAddress.toLocaleLowerCase()) {
      let tokenURI = await tokenContract.tokenURI(tokenId);
      // console.log({ name, symbol, tokenId, tokenURI, tokenContractAddress });
      toAddTokens.push({
        name,
        symbol,
        tokenId,
        tokenURI,
        tokenContractAddress,
      });
    }
  }
  console.log(toAddTokens);
  console.log(setErc721List);
  setErc721List([...erc721List, ...toAddTokens]);

  // let balance = await tokenContract.balanceOf(walletAddress);
  // balance = ethers.utils.formatUnits(balance, 18);
  // console.log(balance);
  // setErc20List([...erc20List, { name, symbol, balance, tokenContractAddress }]);
  // return;
};

export const transferErc721 = (provider, signer, walletAddress, recipientAddress, tokenAmount) => {
  let gas_limit = "0x100000";

  window.ethersProvider.getGasPrice().then((currentGasPrice) => {
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
    console.log(`gas_price: ${gas_price}`);

    if (contract_address) {
      // general token send
      let contract = new ethers.Contract(contract_address, send_abi, walletSigner);

      // How many tokens?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);
      console.log(`numberOfTokens: ${numberOfTokens}`);

      // Send tokens
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult);
        alert("sent token");
      });
    } // ether send
    else {
      const tx = {
        from: send_account,
        to: to_address,
        value: ethers.utils.parseEther(send_token_amount),
        nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
        gasLimit: ethers.utils.hexlify(gas_limit), // 100000
        gasPrice: gas_price,
      };
      console.dir(tx);
      try {
        walletSigner.sendTransaction(tx).then((transaction) => {
          console.dir(transaction);
          alert("Send finished!");
        });
      } catch (error) {
        alert("failed to send!!");
      }
    }
  });

  const tx = {
    from: walletAddress,
    to: recipientAddress,
    value: ethers.utils.parseEther(tokenAmount),
    nonce: window.ethersProvider.getTransactionCount(walletAddress, "latest"),
    gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    gasPrice: gas_price,
  };

  walletSigner.sendTransaction(tx).then((transaction) => {
    console.dir(transaction);
    alert("Send finished!");
  });
};
