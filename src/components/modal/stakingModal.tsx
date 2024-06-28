import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { toggleStakingModal, toggleItemModal } from "../../state/dialog";
import { Icon } from "@iconify/react";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";
import Checkbox from "../checkBox";
import Cookies from "js-cookie";
import { updateMultistate } from "../../state/renegades";
import useStaking from "../../hook/useStaking";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { constants } from "fs/promises";

export default function StakingModal({ isStaking }: { isStaking: boolean }) {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { account } = useWallet();
  const stake = useStaking();
  const [isSigningTransaction, setIsSigningTransaction] =
    useState<boolean>(false);
  const [isTransactionSuccess, setIsTransactionSuccess] =
    useState<boolean>(false);
  const [skip, setSkip] = useState(false);
  const openStakingModal = useAppSelector(
    (state) => state.dialogState.openStakingModal
  );
  const data = useAppSelector((state) => state.dialogState.bItemModal);

  function open() {
    dispatch(toggleStakingModal(true));
  }

  function close() {
    dispatch(toggleStakingModal(false));
    setIsSigningTransaction(false);
    dispatch(toggleItemModal([]));
    setIsTransactionSuccess(false);
  }


  const onStake = async () => {
    if (account) {
      try {
        setIsSigningTransaction(true);
        const response = await stake(
          account?.address,
          data.map((item: { token_data_id: string }) => item.token_data_id)
        );
        if (response?.success) {
          setIsSigningTransaction(false);
          setIsTransactionSuccess(true);
          
        }
      } catch (error) {
        setIsSigningTransaction(false);
        setIsTransactionSuccess(false);
      }
    }
  };

  const toggleCheckbox = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    if (newIsChecked) {
      Cookies.set("dontShowAgain", "true", { expires: 365 });
      setTimeout(() => {
        dispatch(updateMultistate(true));
      }, 500);
      setSkip(true);
    } else {
      Cookies.remove("dontShowAgain");
      setTimeout(() => {
        dispatch(updateMultistate(false));
      }, 500);
      setSkip(false);
    }
  };

  return (
    <>
      {/* <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button> */}

      <Dialog
        open={openStakingModal}
        as="div"
        className="relative z-[250] focus:outline-none"
        onClose={close}
        __demoMode
      >
        <DialogBackdrop
          onClick={() => {}}
          className="fixed inset-0 bg-black/90"
        />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            {!isSigningTransaction && !isTransactionSuccess && (
              <DialogPanel
                transition
                className="w-full sm:w-[566px] border-gray-light-3 rounded-[8px] p-4  h-[95%] sm:h-[510px] bg-[#222] backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-[26px] font-semibold text-[#FFF] leading-[30px]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">
                      Proceed and unstake NFTs?
                    </p>
                    <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                      <Icon
                        onClick={close}
                        icon={"iconoir:cancel"}
                        fontSize={34}
                        className="cursor-pointer "
                      />
                    </div>
                  </div>
                </DialogTitle>
                <div className="relative flex items-center justify-center my-8 sm:my-12">
                  {data.length > 1 && (
                    <div className="absolute right-[25%] -top-[16px] bg-primary border-2 border-[#FFF] w-[123px] h-[46px] rounded-[8px] flex items-center justify-center text-[22px] font-semibold">
                      + {data.length - 1} more
                    </div>
                  )}
                  <img
                    src={data[0]?.token_uri}
                    className="w-[150px] h-[150px] rounded-[8px]"
                  />
                </div>
                <p className="text-[18px] font-semibold text-[#FFF] leading-[130%] text-center">
                  {isStaking
                    ? `If you proceed, you will start receiving staking points for this NFT.
                        The NFT will be staked and locked into the staking pool.`
                    : `If you proceed, you will stop receiving staking points for this NFTs. The NFTs will be unstaked and returned to your wallet.`}
                </p>
                <div className="flex flex-col items-center justify-center w-full gap-4 my-6 sm:gap-6 sm:flex-row">
                  <PrimaryButton
                    //onClick={onLiqify}
                    className="block sm:hidden !font-bold w-full sm:w-[253px] h-12"
                  >
                    {}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => {
                      dispatch(toggleStakingModal(false));
                      dispatch(toggleItemModal([]));
                      setIsSigningTransaction(false);
                    }}
                    className="!font-bold w-full sm:w-[203px] h-12"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={() => {
                      onStake();
                    }}
                    className="hidden sm:block !font-bold w-full sm:w-[253px] !h-12"
                  >
                    {isStaking ? "Stake" : "Unstake"}
                  </PrimaryButton>
                </div>
                <div className="flex items-center justify-center">
                  <Checkbox isChecked={isChecked} onToggle={toggleCheckbox} />
                  <p
                    className="text-lg h-[25px] ml-1 font-semibold cursor-pointer"
                    onClick={toggleCheckbox}
                  >
                    Don’t show this dialog again
                  </p>
                </div>
              </DialogPanel>
            )}
            {isSigningTransaction && (
              <DialogPanel
                transition
                className="relative flex justify-center items-center w-[566px] h-[221px] bg-[#222] border-gray-light-3 rounded-[8px] p-6"
              >
                <div className="flex flex-col items-center w-full">
                  <p className="text-[26px] font-semibold leading-[130%]">
                    Sign transaction in wallet
                  </p>
                  <p className="text-[18px] font-semibold mt-10">
                    Please sign the transaction in your wallet
                  </p>
                </div>
              </DialogPanel>
            )}
            {isTransactionSuccess && (
              <DialogPanel
                transition
                className="w-full relative sm:w-[566px] border-gray-light-3 rounded-[8px]  h-[95%] sm:h-[510px] bg-[#222] backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="absolute -z-10 top-[15%]">
                  <img src="/staking/Background.svg" className="w-full" />
                </div>
                <DialogTitle
                  as="h3"
                  className="text-[26px] font-semibold text-[#FFF] p-4 leading-[30px]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">
                      Success
                    </p>
                    <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                      <Icon
                        onClick={close}
                        icon={"iconoir:cancel"}
                        fontSize={34}
                        className="cursor-pointer "
                      />
                    </div>
                  </div>
                </DialogTitle>
                <div className="relative flex items-center justify-center my-8 sm:my-12">
                  {data.length > 1 && (
                    <div className="absolute right-[25%] -top-[16px] bg-primary border-2 border-[#FFF] w-[123px] h-[46px] rounded-[8px] flex items-center justify-center text-[22px] font-semibold">
                      + {data.length - 1} more
                    </div>
                  )}
                  <img
                    src={data[0]?.token_uri}
                    className="w-[150px] h-[150px] rounded-[8px]"
                  />
                </div>
                <p className="text-[18px] font-semibold text-[#FFF] leading-[130%] text-center">
                  {isStaking
                    ? `Hooray! You’ve successfully staked your Renegades NFT!`
                    : `If you want, you can liquify them to get $RENA back`}
                </p>
                <div className="flex flex-col items-center justify-center w-full gap-4 my-6 sm:gap-6 sm:flex-row">
                  <SecondaryButton
                    onClick={() => {
                      dispatch(toggleStakingModal(false));
                      dispatch(toggleItemModal([]));
                      setIsSigningTransaction(false);
                      setIsTransactionSuccess(false);
                    }}
                    className="!font-bold w-full sm:w-[203px] h-12"
                  >
                    Great
                  </SecondaryButton>
                </div>
              </DialogPanel>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
