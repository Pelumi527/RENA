import JoinUs from "../../../components/header/joinus";

const Footer = () => {
  return (
    <div className="w-full px-4 md:px-0">
      <div className="flex flex-col items-center w-full md:h-[234px] bg-[#222222]">
        <div className="flex flex-col justify-between h-full w-full md:w-[1000px] pb-4 pt-[26px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-[92px]">
              <div className="flex">
                <img src="/logo.svg" alt="cred" className="w-[123px] md:w-[158px]" />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[18px] font-semibold">Get $RENA</p>
                <p className="text-[18px] font-semibold">Claim or Liquify NFT</p>
              </div>
            </div>
            <div className="flex">
              <JoinUs />
            </div>
          </div>
          <p className="text-[16px] font-semibold text-[#B9B9B9] text-center md:text-left">© {new Date().getFullYear()} Renegades</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
