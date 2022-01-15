import { Button, Input } from "@mantine/core";
import { addNewErc20Token } from "../utils/erc20";
import AddNewErc721Token from "../utils/erc721";
import { useStore } from "../shared/store";
import { useInputState } from "@mantine/hooks";

const ErcTokenInput = ({ placeholder, tokenType, setTokenContractType }) => {
  // const [provider, signer] = useStore((state) => [
  //   state.provider,
  //   state.signer,
  // ]);
  const provider = useStore((state) => state.provider);
  const [tokenAddress, setTokenAddress] = useInputState("");
  const walletAddress = useStore((state) => state.walletAddress);
  const [erc20List, setErc20List] = useStore((state) => [state.erc20List, state.setErc20List]);
  const [erc721List, setErc721List] = useStore((state) => [state.erc721List, state.setErc721List]);

  const addNewTokenContract = (tokenAddress, walletAddress) => {
    if (tokenType === "erc20") {
      addNewErc20Token(provider, tokenAddress, walletAddress, erc20List, setErc20List);
    } else if (tokenType === "erc721") {
      AddNewErc721Token(provider, tokenAddress, walletAddress, erc721List, setErc721List);
    }
    setTokenAddress("");
  };

  return (
    <>
      <Input
        style={{ flex: 1, marginRight: "10px" }}
        variant="default"
        placeholder={placeholder}
        onChange={setTokenAddress}
        value={tokenAddress}
      />
      <Button variant="light" onClick={() => addNewTokenContract(tokenAddress, walletAddress)}>
        추가
      </Button>
    </>
  );
};

export default ErcTokenInput;
