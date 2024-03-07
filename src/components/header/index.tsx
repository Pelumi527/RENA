import { useNavigate } from "react-router-dom";
import SecondaryButton from "../secondaryButton";
import JoinUs from "./joinus";

interface Props {
  className?: string;
  claimButton?: string;
}

const Header: React.FC<Props> = ({ className, claimButton }) => {

  const navigate = useNavigate();

  return (
    <>
      <div className={`${className} bg-opacity-0 flex w-full h-[144px] justify-between items-center px-12`}>
        <div className="flex items-center" style={{ zIndex: 100 }}>
          <img onClick={() => navigate('/')}
            src="/logo.svg"
            className="h-[118px] cursor-pointer w-[205px]"
          />
        </div>
        <div className="flex items-center justify-end">
          <p onClick={() => navigate('/claim')} className={`text-[22px] font-white font-semibold cursor-pointer ${claimButton}`} style={{ zIndex: 100 }}>Liquify or Claim</p>
          <div className="ml-12 mr-6">
            <SecondaryButton className="z-20 relative w-[209px]">
              <p className="text-[18px] h-5 font-bold">Get $RENA</p>
              <p className="text-[16px] font-semibold">Coming soon</p>
            </SecondaryButton>
          </div>
          <div style={{ zIndex: 100 }} className="flex">
            <JoinUs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
