import { AppShell, Burger, Button, Header, MediaQuery, useMantineTheme, Navbar, Badge } from "@mantine/core";

import Image from "next/image";
import Link from "next/link";
import { PlusOutlined, WalletOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useState } from "react";
import { connectToWallet } from "../utils/connectToWallet";
import { useStore } from "../shared/store";
import round from "../utils/round";

const CButton = styled(Button)`
  display: flex;
  &:hover {
    background-color: #228be638;
  }
`;

const CAppShell = styled(AppShell)`
  main {
    background-color: rgb(245, 249, 250);
  }
`;

export default function Layout({ children }) {
  const [navbarOpend, setNavbarOpened] = useState(false);
  const theme = useMantineTheme();
  const [walletAddress, setWalletAddress] = useStore((state) => [state.walletAddress, state.setWalletAddress]);
  const [walletBalance, setWalletBalance] = useStore((state) => [state.walletBalance, state.setWalletBalance]);
  const [setProvider, setSigner] = useStore((state) => [state.setProvider, state.setSigner]);
  const [erc20List, setErc20List] = useStore((state) => [state.erc20List, state.setErc20List]);

  const handleClickConnectToWallet = async () => {
    const { provider, signer, walletAddress, walletBalance } = await connectToWallet(erc20List, setErc20List);
    setWalletAddress(walletAddress);
    setWalletBalance(walletBalance);
    setProvider(provider);
    setSigner(signer);
  };

  return (
    <CAppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!navbarOpend}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 200, lg: 300 }}
        >
          <Link href="/inside-wallet" passHref>
            <CButton
              onClick={() => setNavbarOpened(!navbarOpend)}
              leftIcon={<WalletOutlined />}
              variant="white"
              color="dark"
            >
              지갑 조회
            </CButton>
          </Link>
          <Link href="/mint-nft" passHref>
            <CButton
              onClick={() => setNavbarOpened(!navbarOpend)}
              leftIcon={<PlusOutlined />}
              variant="white"
              color="dark"
            >
              NFT 민트
            </CButton>
          </Link>
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <div style={{ alignSelf: "center" }}>
                  <Burger
                    opened={navbarOpend}
                    onClick={() => setNavbarOpened(!navbarOpend)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </div>
              </MediaQuery>

              <h1>TOZAU</h1>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column", marginRight: "15px" }}>
                {walletAddress && (
                  <Badge style={{ fontSize: "13px", marginBottom: "4px" }}>
                    {walletAddress.slice(0, 5) + "...." + walletAddress.slice(-4)}
                  </Badge>
                )}
                {walletBalance && (
                  <span style={{ alignSelf: "flex-end", fontSize: "12px", margin: "0 auto" }}>
                    {round(walletBalance)} (ETH)
                  </span>
                )}
              </div>

              {!walletBalance && (
                <Button variant="light" color="orange" onClick={handleClickConnectToWallet}>
                  <Image width={28} height={28} src="https://docs.metamask.io/metamask-fox.svg" alt="" />
                  <span style={{ marginLeft: "10px" }}>지갑 연결</span>
                </Button>
              )}
            </div>
          </div>
        </Header>
      }
    >
      <div style={{ paddingRight: "10px" }}>{children}</div>
    </CAppShell>
  );
}
