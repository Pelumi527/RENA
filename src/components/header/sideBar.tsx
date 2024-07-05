import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../state/dialog";
import JoinUs from "./joinus";
import ConnectButton from "../connectButton";
import { useEffect, useState } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.dialogState.bSidebar);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isOpen === 2) {
      setTimeout(() => setShow(false), 1000);
    } else if (isOpen === 1) {
      setShow(true);
    }
  }, [isOpen]);

  if (isOpen === 0) return null;
  let animationClass =
    isOpen === 1 ? "animate-slideDown" : isOpen === 2 ? "animate-slideUp" : "";

  return (
    <>
      {show && (
        <div
          className={`${animationClass} fixed inset-0 w-full bg-primary z-[300] flex flex-col justify-between px-5 pt-10 pb-12`}
        >
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ zIndex: 100 }}>
                <img
                  onClick={() => {
                    navigate("/");
                    dispatch(toggleSidebar(2));
                  }}
                  src="/logo-white.svg"
                  className="h-[106px] md:h-[118px] cursor-pointer w-[182px] md:w-[205px]"
                  alt="sidebar"
                />
              </div>
              <Icon
                onClick={() => {
                  dispatch(toggleSidebar(2));
                }}
                icon={"fluent-mdl2:cancel"}
                className="text-[32px] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div />
            <div className="flex flex-col flex-shrink-0 gap-8">
              <Link to={"/staking"}>
                <p
                  onClick={() => dispatch(toggleSidebar(2))}
                  className="text-[26px] font-semibold text-center leading-[30px]"
                >
                  Staking
                </p>
              </Link>
              <Link to={"/claim"}>
                <p
                  onClick={() => dispatch(toggleSidebar(2))}
                  className="text-[26px] font-semibold text-center leading-[30px]"
                >
                  Claim or Liquify NFT
                </p>
              </Link>
              <Link to={"/renegades"}>
                <p
                  onClick={() => dispatch(toggleSidebar(2))}
                  className="text-[26px] font-semibold text-center leading-[30px]"
                >
                  My Renegades
                </p>
              </Link>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 w-full">
              <Link to={"https://liquidswap.com/#/"} rel="noreferrer">
                <button className="w-[176px] mb-6 h-12 bg-[#FFF] text-[#121221] font-bold text-[18px] rounded-[4px]">
                  Get $RENA
                </button>
              </Link>
              <ConnectButton />
              <div className="mt-14">
                <JoinUs />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
