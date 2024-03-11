import { Link } from "react-router-dom";
import JoinUs from "../header/joinus";

const Footer = () => {
  return (
    <div className="w-full md:px-0">
      <div className="flex flex-col items-center w-full md:h-fit bg-[#222222]">
        <div className="flex flex-col justify-between h-full w-[95%] xl:w-[1200px] pb-4 pt-[26px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-[92px]">
              <div className="flex flex-col justify-between h-full">
                <img src="/logo.svg" alt="cred" className="w-[180px] h-[103px]" />
                <p className="text-[16px] font-semibold text-[#666] text-center md:text-left">© {new Date().getFullYear()} Renegades</p>
              </div>
              <div className="flex flex-col gap-4">
                <Link to={'#'}><p className="text-[18px] font-semibold">Get $RENA</p></Link>
                <Link to={'/claim'}> <p className="text-[18px] font-semibold">Claim or Liquify NFT</p></Link>
                <Link to={'/renegades'}><p className="text-[18px] font-semibold">My Renegades</p></Link>
                <div className="flex justify-between w-[278px] font-semibold text-[16px] text-[#CCC] mt-[56px]">
                  <p className="">Privacy policy</p>
                  <p className="">Terms of Service</p>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <JoinUs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
