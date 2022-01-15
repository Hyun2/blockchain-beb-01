import create from "zustand";

export const useStore = create((set) => ({
  provider: null,
  setProvider: (provider) => set({ provider }),
  signer: null,
  setSigner: (signer) => set({ signer }),
  walletAddress: null,
  setWalletAddress: (walletAddress) => set({ walletAddress }),
  walletBalance: null,
  setWalletBalance: (walletBalance) => set({ walletBalance }),
  erc20List: [
    // {
    //   name: 'Ethereum',
    //   symbol: 'ETH',
    //   tokenContractAddress: '0x0x0eex0x0x',
    //   balance: 30000,
    // },
  ],
  setErc20List: (erc20List) => set({ erc20List }),
  selectedErc20: null,
  setSelectedErc20: (selectedErc20) => set({ selectedErc20 }),
  erc721List: [
    {
      name: "cozyNFT",
      symbol: "cozy",
      tokenContractAddress: "0x0x0x30x0x11",
      tokenId: 1,
      tokenURI:
        "https://img1.daumcdn.net/thumb/R300x0/?fname=https://k.kakaocdn.net/dn/bU93Z6/btrdgRxbH4T/zoVrVxIBGM7yKSqEAQDSck/img.png",
    },
    {
      name: "cozyNFT",
      symbol: "cozy",
      tokenContractAddress: "0x0x0x0x0x",
      tokenId: 2,
      tokenURI: "https://media.vlpt.us/images/leejh9022/post/da20dd70-fd30-44ea-9f31-38aa8a56a3c6/reactjs-thumb.jpg",
    },
  ],
  setErc721List: (erc721List) => set({ erc721List }),
  addErc721List: (erc721List, erc721Token) => set({ erc721List: [...erc721List, erc721Token] }),
}));
