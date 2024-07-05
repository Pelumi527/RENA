import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";

import {
  AptosWalletAdapterProvider,
} from "@aptos-labs/wallet-adapter-react";
import { AutoConnectProvider } from "./AutoConnectProvider";
import { FC, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets = [
    new PetraWallet(),
    new PontemWallet(),
    new OKXWallet(),
    new RiseWallet(),
    new FewchaWallet(),
    new MartianWallet(),

    // Blocto supports Testnet/Mainnet for now.
    // new BloctoWallet({
    //   network: NetworkName.Testnet,
    //   bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
    // }),
    // new FaceWallet(face!),
    // new FlipperWallet(),
    // new MSafeWalletAdapter(),
    // new NightlyWallet(),
    // new OpenBlockWallet(),
    // new TokenPocketWallet(),
    // new TrustWallet(),
    // new WelldoneWallet(),
  ];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        toast.info("Wallet connection canceled", {
          progressStyle: { backgroundColor: "white" },
          className: "custom-toast-info",
          theme: "colored",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AutoConnectProvider>
    </>
  );
};
