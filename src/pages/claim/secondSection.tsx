import PrimaryButton from "../../components/primaryButton"

const SecondSection = () => {
    return (

        <div className="flex flex-col w-full mt-[238px] items-center px-4">
            <div className="flex items-start gap-8" >
                <div className="flex flex-col h-[566px] sm:h-[420px] sm:justify-end ">
                    <img
                        src="/claim/second.svg"
                        className="sm:hidden block h-[335px] cursor-pointer w-[452px]"
                    />
                    <p className="text-[32px] font-bold relative justify-start text-center sm:text-start leading-[130%] mt-20 sm:mt-0">
                        Claim your NFTs <span className="text-primary mx-2"><br className="sm:hidden"/>using $RENA </span>
                    </p>
                    <p className="text-[22px] text-gray-light font-semibold z-20 relative flex justify-center mb-10 text-center sm:text-start">
                        For every $RENA in your wallet you can claim a Renegade NFT
                    </p>
                    <p className="text-[22px] text-gray-light font-semibold z-20 relative flex justify-center sm:justify-start mb-4">
                        Connect wallet to claim NFTsCool
                    </p>
                    <div className="flex w-full justify-center sm:justify-start">
                        <PrimaryButton className="z-20 relative w-[200px]">
                            <p className="text-[18px] h-5 font-bold">Connect Wallet</p>
                            <p className="text-[16px] font-semibold">Coming soon</p>
                        </PrimaryButton>
                    </div>
                </div>
                <img
                    src="/claim/second.svg"
                    className="hidden sm:block h-[335px] cursor-pointer w-[452px]"
                />
            </div>
        </div>
    )
}
export default SecondSection;