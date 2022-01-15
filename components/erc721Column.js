import { Col, Grid } from "@mantine/core";
import { useState } from "react";
import { useStore } from "../shared/store";
import Erc721Card from "./erc721Card";
import ErcTokenInput from "./ercTokenInput";
import TransferErc721Modal from "./transferErc721Modal";

const Erc721Column = () => {
  const erc721List = useStore((state) => state.erc721List);
  const [selectedErc721, setSelectedErc721] = useState(null);
  const [transferErc721ModalOpend, setTransferErc721ModalOpend] = useState(false);

  const toggleTransferErc721Modal = () => {
    setTransferErc721ModalOpend(!transferErc721ModalOpend);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <ErcTokenInput
          // setTokenContractType={setTokenContractType}
          placeholder="ERC721 Token Address"
          tokenType="erc721"
        />
      </div>
      <div>
        <Grid>
          {erc721List.map((erc721) => {
            return (
              <Col key={erc721.tokenContractAddress + erc721.tokenId} span={6}>
                <Erc721Card
                  erc721={erc721}
                  toggleTransferErc721Modal={toggleTransferErc721Modal}
                  setSelectedErc721={setSelectedErc721}
                />
              </Col>
            );
          })}
        </Grid>
      </div>
      <TransferErc721Modal
        transferErc721ModalOpend={transferErc721ModalOpend}
        setTransferErc721ModalOpend={setTransferErc721ModalOpend}
        selectedErc721={selectedErc721}
      />
    </>
  );
};

export default Erc721Column;
