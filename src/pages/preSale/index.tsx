import React, { useEffect, useState } from 'react';
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Sidebar from "./sidebar/sidebar";
import PrimaryButton from "../../components/primaryButton";
import { AccountAddress, Aptos, AptosConfig, GetEventsResponse, InputViewFunctionData } from "@aptos-labs/ts-sdk";
import { APTOS, CONTRIBUTED_AMOUNT, CONTRIBUTED_AMOUNT_FROM_ADDRESS, IS_COMPLETED, REMAINING_TIME, RENA_MODULE_TESTNET, RENA_PRESALE_TESTNET, TOTAL_CONTRIBUTORS, TOTAL_RAISED_FUNDS, TREASURY_ADDRESS } from "../../util/module-endpoints";
import { Network } from 'aptos';
import { Events } from '../../api';
import useContribute from '../../hook/useContribute';
import { useAppSelector } from '../../state/hooks';
import { updateAptConts } from '../../state/renegades';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { Address } from 'aptos/src/generated';
import { get, set, toNumber } from 'lodash';
import { time } from 'console';

const PreSale = () => {
  const { account } = useWallet();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);
  const [liveTime, setLiveTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState("/presale/bg-presale.svg");
  const [presaleEvent, setPresaleEvent] = useState<GetEventsResponse | null>(null);
  const [presaleExists, setPresaleExists] = useState<boolean>(false);

  const [contributedAmount, setContributedAmount] = useState<any>(null);
  const [presaleCompleted, setPresaleCompleted] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [totalContributors, setTotalContributors] = useState<number>(0);
  const [totalRaisedFunds, setTotalRaisedFunds] = useState<number>(0);
  const [finalTotalRaisedFunds, setFinalTotalRaisedFunds] = useState<number>(0);
  const [treasuryAddress, setTreasuryAddress] = useState<string>('');

  const [contributors, setContributors] = useState<any[]>([]);

  const [shouldFetch, setShouldFetch] = useState(false);

  const contribute = useContribute();

  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const fetchPresale = async () => {
    try {
      const presaleResource = await aptos.getAccountResource(
        {
          accountAddress: `0xa408eaf6de821be63ec47b5da16cbb5a3ab1af6a351d0bab7b6beddaf7802776`,
          resourceType: `${RENA_PRESALE_TESTNET}::Info`,
        }
      );
      console.log('presale resource: ', presaleResource);
      // setContributors(presaleResource.data.contributors);
      setPresaleExists(true);
    } catch (e: any) {
      setPresaleExists(false);
      // TODO: show presale coming soon
    }
  };

  useEffect(() => {
    fetchPresale();
  }, []);
  
  // get the completion status of the presale
  const getIsPresaleCompleted = () => {
    const viewIsCompleted = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${IS_COMPLETED}`
      };
      let res = await APTOS.view({ payload });
      console.log('is presale completed: ', res);
    };
    return viewIsCompleted;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getIsPresaleCompleted();
      setPresaleCompleted(result as any);
    };

    fetchData();
  }
  // when it changes to true, we can show the presale is completed
  , []);

  // get contributed amount per account
  const getContributedAmount = async (accountAddress: Address) => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${CONTRIBUTED_AMOUNT_FROM_ADDRESS}`,
        functionArguments: [accountAddress]
      };
      let res = await APTOS.view({ payload });
      console.log('contributed amount: ', res);
      return res; // Return the result from viewContributedAmount
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContributedAmount(account?.address ?? ''); // Call the returned function to trigger fetch
        setContributedAmount(result[0]); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [shouldFetch, account]);

  // get the total raised funds
  const getTotalRaisedFunds = async () => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${TOTAL_RAISED_FUNDS}`
    };
    let res = await APTOS.view({ payload });
    console.log('total raised funds: ', res);
    return res;
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await getTotalRaisedFunds(); // Call the returned function to trigger fetch
      setTotalRaisedFunds(result as any);
      setShouldFetch(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [shouldFetch, account]);

  // get the remaining time of the presale
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRemainingTime = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${REMAINING_TIME}`
      };
      let res = await APTOS.view({ payload });
      console.log('remaining time: ', res[0]);
    return res[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRemainingTime(); // Call the returned function to trigger fetch
        setRemainingTime(result as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [getRemainingTime]);

  // get the total contributors
  const getTotalContributors = () => {
    const viewTotalContributors = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TOTAL_CONTRIBUTORS}`
      };
      let res = await APTOS.view({ payload });
      console.log('total contributors number: ', res);
    };
    return viewTotalContributors;
  };

  const fetchData = async () => {
    const result = await getTotalContributors();
    setTotalContributors(result as any);
  };

  useEffect(() => {
    getTotalContributors();
  }, []);

  // get the treasury address
  const getTreasuryAddress = () => {
    const viewTreasuryAddress = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TREASURY_ADDRESS}`
      };
      let res = await APTOS.view({ payload });
      console.log('treasury address: ', res);
    };
    return viewTreasuryAddress;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTreasuryAddress();
      setTreasuryAddress(result as any);
    };

    fetchData();
  }, []);

  const onContribute = async () => {
    console.log(Date.now(), endTime, startTime)
    if (account && count && Date.now() < endTime && Date.now() >= startTime) {
      try {
        await contribute(account.address, count);
        getTotalRaisedFunds();
        getContributedAmount(account?.address);
        setShouldFetch(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getDistributedFunds = async () => {
    try {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const event = new Events(aptosConfig);
      const contributionsUpdatedEvent = await event.getSaleFundsDistributedEvent();
      const amounts = contributionsUpdatedEvent
        .filter(event => event.data.contributor === account?.address)
        .map(event => event.data.amount);
      console.log('get distribution: ', Number(amounts[amounts.length - 1]));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (account) {
      getDistributedFunds();
      // getContributedAmount();
    }
  }, [account]);

  const getPresaleFinalized = async () => {
    try {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const event = new Events(aptosConfig);
      const finalizedEvent = await event.getPresaleFinalizedEvent();
      console.log('finalized event: ', finalizedEvent);
      let total_funds_raised = Number(finalizedEvent[finalizedEvent.length - 1].data.raised_funds);
      console.log('total funds raised: ', total_funds_raised);
      setFinalTotalRaisedFunds(total_funds_raised);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPresaleFinalized();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const aptosConfig = new AptosConfig({ network: Network.TESTNET });
        const event = new Events(aptosConfig);
        const events = await event.getPresaleCreatedEvent();
        const start = Number(events[events.length - 1].data.start * 1000);
        const end = Number(events[events.length - 1].data.end * 1000);
        setEndTime(end);
        setStartTime(start);
        setLiveTime(start - Date.now());
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 500) {
        setBackgroundImage("/presale/bg-mobile.svg");
      } else {
        setBackgroundImage("/presale/bg-presale.svg");
      }
    };

    window.addEventListener('resize', updateBackground);
    updateBackground();

    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTime((prevLiveTime) => {
        const updatedLiveTime = prevLiveTime - 1000;
        return updatedLiveTime > 0 ? updatedLiveTime : 0;
      });
      setEndTime((prevEndTime) => {
        const updatedEndTime = prevEndTime - 1000;
        return updatedEndTime > 0 ? updatedEndTime : 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatNumberWithDecimals(number: number, decimals: number | string): string {
    const parsedDecimals = typeof decimals === 'number' ? decimals : parseFloat(decimals);
  
    if (isNaN(parsedDecimals) || parsedDecimals < 0 || parsedDecimals > 100) {
      throw new Error('Invalid decimals argument');
    }
  
    const formattedResult = number.toFixed(parsedDecimals);

    // Remove trailing zeros from the decimal part
    const trimmedResult = formattedResult.replace(/\.?0+$/, '');
  
    return trimmedResult;
}

function formatSeconds(seconds: number): string {
  let days = Math.floor(seconds / (3600 * 24));
  let hours = Math.floor((seconds % (3600 * 24)) / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  let formattedTime = `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  return formattedTime;
}

// format milliseconds to date
function formatDate(milliseconds: number): string {
  const date = new Date(milliseconds);
  return date.toDateString();
}

// format remaining time to date given two dates
function formatRemainingTime(startDate: number, endDate: number): string {
  const remainingTime = endDate - startDate;
  // don't show decimals=
  const formattedTime = formatNumberWithDecimals(remainingTime, 0);

  return formatSeconds(Number(formattedTime));
}

  return (
    <div className="parallax relative" id="cred-point">
      <Header className="" active={2} />
      <div className="w-full h-full pb-16">
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'top', backgroundSize: 'cover' }} className="w-full flex flex-col z-20 relative items-center sm:-mt-10">
          <div className="flex flex-col items-center w-full mt-20 sm:mt-[120px]">
            <p className="font-bold text-[42px] lg:text-[58px] mb-9">
              Join the Presale
            </p>
            <div className="flex flex-col items-center w-[95%] sm:w-[400px] h-fit bg-[#111] border border-[#666] rounded-[8px] py-8 px-6">
              {
                /* Presale is not created yet */
                !presaleExists?
                  <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                    <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Date will be announced</p>
                    <p className="text-[22px] font-semibold text-[#CCC]">on <a href="https://twitter.com/0xrenegades" target="_blank" rel="noopener noreferrer">@0xrenegades</a> on X</p>
                  </p>
                /* Presale is scheduled */
                : presaleExists && (startTime > Date.now()) && (endTime >= Date.now())?
                  /* add another check to see if the presale is scheduled or live */
                  <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                    <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">{formatRemainingTime((Date.now() / 1000), startTime / 1000)}</p>
                    <p className="text-[22px] font-semibold text-[#CCC]">{formatDate(startTime)}</p>
                  </p>
                /* Presale is live */
                : presaleExists && (startTime <= Date.now()) && (endTime >= Date.now())?
                <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                  <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Presale is LIVE</p>
                  <p className="text-[22px] font-semibold text-[#CCC]">Ends in {formatSeconds(remainingTime)}</p>
                </p>
                /* Presale is completed */
                : presaleExists && (endTime <= Date.now())?
                  <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                    <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Presale is COMPLETED</p>
                    <p className="text-[22px] font-semibold text-[#CCC]">Thank you for participating</p>
                  </p>
                : null
              }
              <div className="flex w-full items-center justify-between h-[26px] font-semibold text-[22px] my-[56px]">
                <p>Total Raised</p>
                <div className="flex items-center font-semibold text-[22px] gap-4">
                  {
                    /* presale is completed */
                    presaleExists && (endTime < Date.now()) ?
                    <p>{formatNumberWithDecimals(((finalTotalRaisedFunds as number) / 100000000), '8')}</p> :
                    <p>{formatNumberWithDecimals(((totalRaisedFunds as number) / 100000000), '8')}</p>
                  }                  
                  <img src="/presale/aptos.svg" className="w-[18px] h-[18px]" />
                </div>
              </div>
              <div className="flex w-full items-center justify-between h-12 font-semibold text-[22px]">
                <input
                  type="text"
                  placeholder="0.00"
                  value={count}
                  onChange={(e) => { Number(e.target.value) >= 0 && setCount(Number(e.target.value)) }}
                  className="font-medium w-[199px] sm:w-[259px] px-6 h-12 rounded-[4px] border bg-[#FFF] bg-opacity-10 hover:bg-opacity-20 border-transparent focus:outline-none focus:border-gray-300"
                  disabled={Date.now() < endTime && Date.now() >= startTime ? false : true}
                  style={{ opacity: 0.5 }}
                />
                <div className="flex items-center font-semibold text-[26px] gap-2 sm:gap-4">
                  <p>APT</p>
                  <img src="/presale/aptos.svg" className="w-[24px] h-[24px]" />
                </div>
              </div>
              {/* {connected ? */}
              <PrimaryButton onClick={onContribute} className={`z-20 relative ${Date.now() < endTime && Date.now() >= startTime ? "" : "cursor-not-allowed bg-opacity-50"} py-1 w-full !h-fit my-6`}>
                <p className="text-[18px] h-[22px] font-bold">GET $RENA</p>
                <p className="text-[16px] h-[22px] font-semibold">Coming soon</p>
              </PrimaryButton>
              {/* :
                <PrimaryButton onClick={() => dispatch(toggleWalletPanel(true))} className="z-20 relative w-full !h-[48px] my-6">
                  <p className="text-[18px] h-6 font-bold">Connect Wallet</p>
                </PrimaryButton>
              } */}
              <div className='flex flex-col items-start w-full gap-2'>
                <p className="flex items-center text-[15px] sm:text-[18px] h-6 font-semibold"><Icon icon={'mdi:dot'} /> Minimum contribution is 1 APT</p>
                <p className="flex items-center text-[15px] sm:text-[18px] h-6 font-semibold"><Icon icon={'mdi:dot'} /> $RENA will be distributed after the Presale</p>
              </div>
              <div className="border-b border-[#666] w-full my-6" />
              <div className="flex w-full items-center justify-between h-[26px] font-semibold text-[22px]">
                <p className="text-[18px] font-medium text-[#CCC]">My Contribution</p>
                <div className="flex items-center font-semibold text-[22px] gap-4">
                  <p>{ 
                    /* presale ended */
                    presaleExists && (endTime < Date.now()) ? 
                    formatNumberWithDecimals(((contributedAmount as number) / 100000000), '8') :
                    formatNumberWithDecimals(((contributedAmount as number) / 100000000), '8')
                  }</p>
                  <img src="/presale/aptos.svg" className="w-[18px] h-[18px]" />
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreSale;