import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../state/dialog";
import JoinUs from "./joinus";
import ConnectButton from "../connectButton";

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isOpen = useAppSelector((state) => state.dialogState.bSidebar);

    if (isOpen == 0) return null;
    let animationClass = isOpen == 1 ? 'animate-slideDown' : isOpen == 2 ? 'animate-slideUp' : '';

    return (
        <div className={`${animationClass} fixed inset-0 w-full bg-primary z-[100] flex flex-col px-5 pt-10 pb-12`}>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center" style={{ zIndex: 100 }}>
                        <img onClick={() => { navigate('/'); dispatch(toggleSidebar(2)) }}
                            src="/logo-white.svg"
                            className="h-[106px] md:h-[118px] cursor-pointer w-[182px] md:w-[205px]"
                        />
                    </div>
                    <Icon onClick={() => { dispatch(toggleSidebar(2)) }} icon={'fluent-mdl2:cancel'} className="text-[32px] cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <div />
                <div className="flex flex-col gap-8 flex-shrink-0">
                    <Link to={'/presale'}><p onClick={() => dispatch(toggleSidebar(2))} className="text-[26px] font-semibold text-center leading-[30px]" >Presale</p></Link>
                    <Link to={'/claim'}><p onClick={() => dispatch(toggleSidebar(2))} className="text-[26px] font-semibold text-center leading-[30px]" >Claim or Liquify NFT</p></Link>
                    <Link to={'/renegades'}><p onClick={() => dispatch(toggleSidebar(2))} className="text-[26px] font-semibold text-center leading-[30px]" >My Renegades</p></Link>
                </div>
                <div className="flex flex-col w-full items-center flex-shrink-0">
                    <Link to={'/presale'}><button className="w-[176px] mb-6 h-12 bg-[#FFF] text-[#121221] font-bold text-[18px] rounded-[4px]">Get $RENA</button></Link>
                    <ConnectButton />
                    <div className="mt-14">
                        <JoinUs />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
