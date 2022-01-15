import { Button, Input, Text } from '@mantine/core';
import NotLogin from '../components/notLogin';
import { useStore } from '../shared/store';
import { useState } from 'react';
import UploadFile from '../components/uploadFile';

const MintNFT = () => {
  const walletAddress = useStore((state) => state.walletAddress);

  if (!walletAddress) return <NotLogin />;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <Text style={{ fontSize: '28px', fontWeight: 'bold', margin: '30px 0' }} align="center">
        Create NFT
      </Text>
      <UploadFile />
      <Input style={{ marginBottom: '20px' }} variant="default" placeholder="받는 사람 지갑 주소" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="light">NFT 생성</Button>
      </div>
    </div>
  );
};

export default MintNFT;
