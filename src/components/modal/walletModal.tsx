import { toggleWalletPanel } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import WalletButtons from "../../wallet-adapter/WalletButtons";
import { useNavigate } from "react-router-dom";

const WalletModal = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bWalletPanel);
  const sentRequest = useAppSelector((state) => state.dialogState.bWalletHold);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-[200] inset-0 h-full flex justify-center items-center bg-gray-dark-1`}
    >
      <div className="relative w-[400px]  bg-[#121212] border-gray-light-3 rounded-[20px]">
        <div className="bg-[#1C1C1C] rounded-t-[20px] p-4 flex justify-between">
          <p className="text-2xl font-bold">
            {sentRequest ? "Connect Aptos wallet" : "Connect wallet"}
          </p>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(toggleWalletPanel(false))}
          >
            <p className="text-3xl font-bold">×</p>
          </div>
        </div>
        {sentRequest && (
          <div
            role="status"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <img src="/loader.svg" className="w-12 h-12" alt="" />
          </div>
        )}
        <div className={`${sentRequest && "opacity-50 cursor-not-allowed"}`}>
          <WalletButtons />
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
