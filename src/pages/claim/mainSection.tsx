import PrimaryButton from "../../components/primaryButton"

const MainSection = () => {
    return (

        <div className="flex flex-col w-full items-center">
            <p className="text-[58px] mt-[100px] font-bold">Claim or Liquify NFTs</p>
            <p className="text-[26px] font-semibold text-gray-light">Claim NFTs or Liquify them to get $RENA back</p>
            <div className="flex w-full justify-center mt-14">
                <PrimaryButton className="z-20 relative w-[209px]">
                    <p className="text-[18px] h-5 font-bold">Connect Wallet</p>
                    <p className="text-[16px] font-semibold">Coming soon</p>
                </PrimaryButton>
            </div>
        </div>
    )
}
export default MainSection;