import { Col, Grid } from "@mantine/core";
import { useStore } from "../shared/store";
import NotLogin from "../components/notLogin";
import Erc20Column from "../components/erc20Column";
import Erc721Column from "../components/erc721Column";

const InsideWallet = () => {
  const walletAddress = useStore((state) => state.walletAddress);

  if (!walletAddress) return <NotLogin />;

  return (
    <div>
      <Grid>
        <Col span={5}>
          <Erc20Column />
        </Col>
        <Col span={7}>
          <Erc721Column />
        </Col>
      </Grid>
    </div>
  );
};

export default InsideWallet;
