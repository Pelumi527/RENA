import { useNavigate } from "react-router-dom";
import SecondaryButton from "../secondaryButton";
import JoinUs from "./joinus";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import ConnectButton from "../connectButton";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toggleSidebar, toggleWalletPanel } from "../../state/dialog";

interface Props {
  className?: string;
  active?: number;
}

const Header: React.FC<Props> = ({ className, active }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { connected, account } = useWallet();

  return (
    <>
      <div className={`${className} bg-opacity-0 flex w-full h-[144px] justify-between items-center px-6 md:px-12`}>
        <div className="flex items-center" style={{ zIndex: 100 }}>
          <img onClick={() => navigate('/')}
            src="/logo.svg"
            className="h-[106px] md:h-[118px] cursor-pointer w-[182px] md:w-[205px]"
          />
        </div>
        <div className="hidden xl:flex items-center justify-end">
          <p onClick={() => navigate('/presale')} className={`hover:text-primary w-[166px] h-12 flex items-center bg-[#000] justify-center rounded-[4px] bg-opacity-0 hover:bg-opacity-40 ${active == 2 && 'text-primary'} text-[22px] font-white font-semibold cursor-pointer ml-2`} style={{ zIndex: 100 }}>Presale</p>
          <p onClick={() => navigate('/claim')} className={` hover:text-primary w-[166px] h-12 flex items-center bg-[#000] justify-center rounded-[4px] bg-opacity-0 hover:bg-opacity-40 text-[22px] font-white font-semibold cursor-pointer ${active == 0 && 'text-primary'}`} style={{ zIndex: 100 }}>Liquify or Claim</p>
          <p onClick={() => { connected ? navigate('/renegades') : dispatch(toggleWalletPanel(true)) }} className={`hover:text-primary w-[166px] h-12 flex items-center bg-[#000] justify-center rounded-[4px] bg-opacity-0 hover:bg-opacity-40 ${active == 1 && 'text-primary'} text-[22px] font-white font-semibold cursor-pointer ml-2`} style={{ zIndex: 100 }}>My Renegades</p>
          <div className="ml-12 mr-6 flex h-12">
            <ConnectButton />
            <SecondaryButton className="z-20 relative w-[176px] h-12 ml-4">
              <p className="text-[18px] h-6 font-bold">Get $RENA</p>
            </SecondaryButton>
          </div>
          <div style={{ zIndex: 100 }} className="flex">
            <JoinUs />
          </div>
        </div>
        <div className="block xl:hidden relative z-20">
          <Icon onClick={() => { dispatch(toggleSidebar(1)) }} icon={'grommet-icons:menu'} className="text-[32px] cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Header;
