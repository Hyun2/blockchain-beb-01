import {
  AppShell,
  Burger,
  Button,
  Header,
  MediaQuery,
  useMantineTheme,
  Navbar,
} from '@mantine/core';

import Image from 'next/image';
import Link from 'next/link';
import { PlusOutlined, WalletOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useState } from 'react';
import { connectToWallet } from '../utils/connectToWallet';
import { useStore } from '../shared/store';

const CButton = styled(Button)`
  display: flex;
  &:hover {
    background-color: grey;
  }
`;

export default function Layout({ children }) {
  const [navbarOpend, setNavbarOpened] = useState(false);
  const theme = useMantineTheme();
  const [walletAddress, setWalletAddress] = useStore((state) => [
    state.walletAddress,
    state.setWalletAddress,
  ]);
  const [walletBalance, setWalletBalance] = useStore((state) => [
    state.walletBalance,
    state.setWalletBalance,
  ]);

  const handleClickConnectToWallet = async () => {
    const { walletAddress, walletBalance } = await connectToWallet();
    console.log(walletAddress, walletBalance);
    setWalletAddress(walletAddress);
    setWalletBalance(walletBalance);
  };

  return (
    <AppShell
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
          <Link href="/inside-wallet">
            <CButton
              onClick={() => setNavbarOpened(!navbarOpend)}
              leftIcon={<WalletOutlined />}
              variant="white"
              color="dark"
            >
              지갑 조회
            </CButton>
          </Link>
          <Link href="/mint-nft">
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
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={navbarOpend}
                onClick={() => setNavbarOpened(!navbarOpend)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px' }}>{walletAddress}</span>
              {walletBalance && (
                <span style={{ fontSize: '14px' }}>{walletBalance} (ETH)</span>
              )}
            </div>
            <Button
              variant="light"
              color="orange"
              onClick={handleClickConnectToWallet}
            >
              <Image
                width={28}
                height={28}
                src="https://docs.metamask.io/metamask-fox.svg"
              />
              <span style={{ marginLeft: '10px' }}>지갑 연결</span>
            </Button>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
