import PrimaryButton from "../../components/primaryButton"

const SecondSection = () => {
    return (

        <div className="flex flex-col w-full mt-[206px] items-center">
            <div className="flex items-start gap-8" >
                <div className="flex flex-col  h-[420px] justify-end ">
                    <p className="text-[32px] font-bold relative flex justify-start">
                        How  <span className="text-primary mx-2">Liquid NFT </span>works?
                    </p>
                    <p className="text-[22px] text-gray-light font-semibold z-20 relative flex justify-center mb-10">
                        For every $RENA in your wallet you can claim a Renegade NFT
                    </p>
                    <p className="text-[22px] text-gray-light font-semibold z-20 relative flex justify-start mb-4">
                        Connect wallet to claim NFTsCool
                    </p>
                    <div className="flex w-full justify-start">
                        <PrimaryButton className="z-20 relative w-[200px]">
                            <p className="text-[18px] h-5 font-bold">Connect Wallet</p>
                            <p className="text-[16px] font-semibold">Coming soon</p>
                        </PrimaryButton>
                    </div>
                </div>
                <img
                    src="/claim/second.svg"
                    className="h-[335px] cursor-pointer w-[452px]"
                />
            </div>
        </div>
    )
}
export default SecondSection;