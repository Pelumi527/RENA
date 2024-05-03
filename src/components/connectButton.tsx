import { useDispatch } from "react-redux";
import { toggleWalletPanel } from "../state/dialog";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  onClick?: () => void;
  children?: any;
}

const ConnectButton: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const { account, connected, disconnect } = useWallet();
  const [isOpenDropDown, toggleOpen] = useState(false);
  const navigate = useNavigate();
  const onDisconnet = () => {
    disconnect();
    // setTimeout(() => {
    //   navigate('/')
    // }, 2000)
  };

  return (
    <>
      {connected ? (
        <div
          className={`flex flex-col w-[176px] h-fit border-x border-t border-[#fff] rounded-t-[4px] relative z-[100] ${!isOpenDropDown && "border-b rounded-b"} `}
        >
          <button
            className={`flex justify-between px-6 items-center h-12 bg-[#FFF] bg-opacity-0 hover:bg-opacity-10 font-semibold bg-black ${className}`}
            onClick={() => {
              toggleOpen(!isOpenDropDown);
            }}
          >
            <p className="text-[18px] text-[#FFF] font-bold">
              {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
            </p>
            <span className="text-xs">
              &nbsp;&nbsp;&nbsp;{isOpenDropDown ? "▲" : "▼"}
            </span>
          </button>
          {isOpenDropDown && (
            <div
              className="w-[176px] border-x border-b absolute -right-[1px] mt-12 bg-[#FFF] rounded-b bg-opacity-0 hover:bg-opacity-10 h-12 font-semibold text-[18px] flex justify-center items-center"
              onClick={() => onDisconnet()}
            >
              <p className="text-center cursor-pointer">Disconnect Wallet</p>
            </div>
          )}
        </div>
      ) : (
        <button
          className={`w-[176px] h-12 relative z-20 bg-[#FFF] bg-opacity-0 hover:bg-opacity-10 font-semibold bg-black border rounded-[4px] ${className}`}
          onClick={() => {
            dispatch(toggleWalletPanel(true));
          }}
        >
          <p className="text-[18px] text-[#FFF] font-bold">Connect wallet</p>
        </button>
      )}
    </>
  );
};

export default ConnectButton;
