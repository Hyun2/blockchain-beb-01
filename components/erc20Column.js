import { useState } from "react";
import { useStore } from "../shared/store";
import Erc20Card from "./erc20Card";
import ErcTokenInput from "./ercTokenInput";
import TransferErc20Modal from "./transferErc20Modal";

const Erc20Column = () => {
  const erc20List = useStore((state) => state.erc20List);
  const [transferErc20ModalOpend, setTransferErc20ModalOpend] = useState(false);
  const [selectedErc20, setSelectedErc20] = useStore((state) => [state.selectedErc20, state.setSelectedErc20]);

  const toggleTransferErc20Modal = () => {
    setTransferErc20ModalOpend(!transferErc20ModalOpend);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <ErcTokenInput
          // setTokenContractType={setTokenContractType}
          placeholder="ERC20 Token Contract Address"
          tokenType="erc20"
        />
      </div>
      <div>
        {erc20List.map((erc20) => {
          return (
            <Erc20Card
              key={erc20.name + erc20.tokenContractAddress}
              toggleTransferErc20Modal={toggleTransferErc20Modal}
              setSelectedErc20={setSelectedErc20}
              erc20={erc20}
            />
          );
        })}
      </div>
      <TransferErc20Modal
        transferErc20ModalOpend={transferErc20ModalOpend}
        setTransferErc20ModalOpend={setTransferErc20ModalOpend}
        selectedErc20={selectedErc20}
      />
    </>
  );
};

export default Erc20Column;
