import { Link } from "react-router-dom";
import JoinUs from "../header/joinus";

const Footer = () => {
  return (
    <div className="w-full md:px-0">
      <div className="flex flex-col items-center w-full md:h-fit bg-[#222222]">
        <div className="flex flex-col justify-between h-full w-[90%] xl:w-[1200px] pb-4 pt-[26px]">
          <div className="flex justify-between">
            <div className="flex sm:flex-row flex-col sm:items-center gap-[62px] sm:gap-[92px]">
              <div className="flex flex-col justify-between h-full">
                <img
                  src="/logo.svg"
                  alt="cred"
                  className="w-[156px] h-[88px] sm:w-[180px] sm:h-[103px]"
                />
                <p className="hidden sm:block text-[16px] font-semibold text-[#666] text-center md:text-left">
                  © {new Date().getFullYear()} Renegades
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link to={"https://liquidswap.com/#/"} target="_blank" rel="">
                  <p className="text-[18px] font-semibold">Get $RENA</p>
                </Link>
                <Link to={"/claim"}>
                  {" "}
                  <p className="text-[18px] font-semibold">
                    Claim or Liquify NFT
                  </p>
                </Link>
                <Link to={"/renegades"}>
                  <p className="text-[18px] font-semibold">My Renegades</p>
                </Link>
                <div className="hidden sm:flex justify-between h-8 w-[278px] font-semibold text-[16px] text-[#CCC] mt-[56px]">
                  {/* <p className="">Privacy policy</p>
                  <p className="">Terms of Service</p> */}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <JoinUs />
            </div>
          </div>
          <p className="block sm:hidden text-[16px] font-semibold text-[#666] text-left md:text-left mt-[210px] mb-[55px]">
            © {new Date().getFullYear()} Renegades
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
