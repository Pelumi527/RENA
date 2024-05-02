import React, { useEffect, useState } from 'react';
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Sidebar from "./sidebar/sidebar";
import PrimaryButton from "../../components/primaryButton";
import { Aptos, AptosConfig, GetEventsResponse, InputViewFunctionData } from "@aptos-labs/ts-sdk";
import { APTOS, CONTRIBUTED_AMOUNT_FROM_ADDRESS, IS_COMPLETED, ONE_RENEGADES, PUBLIC_PRESALE, REMAINING_TIME, RENA_PRESALE_TESTNET, TOTAL_CONTRIBUTORS, TOTAL_RAISED_FUNDS, TREASURY_ADDRESS, WHITELISTED_PRESALE } from "../../util/module-endpoints";
import { Network } from 'aptos';
import { Events } from '../../api';
import useContribute from '../../hook/useContribute';
import useWhitelistContribute from '../../hook/useWhitelistContribute';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { Address } from 'aptos/src/generated';
import { toggleSidebar, toggleWalletPanel } from '../../state/dialog';
import { useAppSelector } from '../../state/hooks';
import { set } from 'lodash';
import "./index.css";

const PreSale = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<string>("0.00");
  const [whitelistCount, setWhitelistCount] = useState<string>("0.00");
  const { account, connected } = useWallet();
  const [liveTime, setLiveTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [whitelistStartTime, setWhitelistStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [whitelistEndTime, setWhitelistEndTime] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState("/presale/bg-presale.svg");
  const [presaleEvent, setPresaleEvent] = useState<GetEventsResponse | null>(null);
  const [presaleExists, setPresaleExists] = useState<boolean>(false);
  const [whitelistPresaleExists, setWhitelistPresaleExists] = useState<boolean>(false);
  const bSidebar = useAppSelector((state) => state.dialogState.bSidebar);
  const [contributedAmount, setContributedAmount] = useState<any>(null);
  const [whitelistContributedAmount, setWhitelistContributedAmount] = useState<any>(null);
  const [distributedFunds, setDistributedFunds] = useState<number>(0);
  const [presaleCompleted, setPresaleCompleted] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [totalContributors, setTotalContributors] = useState<number>(0);
  const [totalRaisedFunds, setTotalRaisedFunds] = useState<number>(0);
  const [whitelistTotalRaisedFunds, setWhitelistTotalRaisedFunds] = useState<number>(0);
  const [finalTotalRaisedFunds, setFinalTotalRaisedFunds] = useState<number>(0);
  const [treasuryAddress, setTreasuryAddress] = useState<string>('');

  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [shouldFetch, setShouldFetch] = useState(false);
  const [whitelistShouldFetch, setWhitelistShouldFetch] = useState(false);

  const contribute = useContribute();

  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  /**
   * Fetch the public presale resource
   */
  const fetchPresale = async () => {
    try {
      const presaleResource = await aptos.getAccountResource(
        {
          accountAddress: `0xa408eaf6de821be63ec47b5da16cbb5a3ab1af6a351d0bab7b6beddaf7802776`,
          resourceType: `${PUBLIC_PRESALE}`,
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  /**
   * 
   * Fetch the private presale resource
   * 
   */
  const fetchPrivatePresale = async () => {
    try {
      const presaleResource = await aptos.getAccountResource(
        {
          accountAddress: `0xa408eaf6de821be63ec47b5da16cbb5a3ab1af6a351d0bab7b6beddaf7802776`,
          resourceType: `${WHITELISTED_PRESALE}`,
        }
      );
      console.log('private presale resource: ', presaleResource);
      setWhitelistPresaleExists(true);
    } catch (e: any) {
      setWhitelistPresaleExists(false);
    }
  };

  useEffect(() => {
    fetchPrivatePresale();
  }, []);

  /**
   * 
   * Fetch the completion status of the public presale
   * 
   */
  const getIsPresaleCompleted = () => {
    const viewIsCompleted = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${IS_COMPLETED}`,
        typeArguments: [`${PUBLIC_PRESALE}`]
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

  /**
   * 
   * Fetch the completion status of the whitelist presale
   * 
   */
  const getIsWhitelistPresaleCompleted = () => {
    const viewIsCompleted = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${IS_COMPLETED}`,
        typeArguments: [`${WHITELISTED_PRESALE}`]
      };
      let res = await APTOS.view({ payload });
      console.log('is whitelist presale completed: ', res);
    };
    return viewIsCompleted;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getIsWhitelistPresaleCompleted();
      setPresaleCompleted(result as any);
    };

    fetchData();
  }
    // when it changes to true, we can show the presale is completed
    , []);


  /**
   * 
   * Fetch the contributed amount of the account in a public presale
   * 
   */
  const getContributedAmount = async (accountAddress: Address) => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${CONTRIBUTED_AMOUNT_FROM_ADDRESS}`,
      typeArguments: [`${PUBLIC_PRESALE}`],
      functionArguments: [accountAddress]
    };
    let res = await APTOS.view({ payload });
    console.log('contributed amount: ', res);
    return res;
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

  /**
   * 
   * Fetch the contributed amount of the account in a whitelist presale
   * 
   */
  const getWhitelistContributedAmount = async (accountAddress: Address) => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${CONTRIBUTED_AMOUNT_FROM_ADDRESS}`,
      typeArguments: [`${WHITELISTED_PRESALE}`],
      functionArguments: [accountAddress]
    };
    let res = await APTOS.view({ payload });
    console.log('contributed amount: ', res);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWhitelistContributedAmount(account?.address ?? ''); // Call the returned function to trigger fetch
        setWhitelistContributedAmount(result[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [shouldFetch, account]);

  /**
   * 
   * Fetch the total raised funds of the public presale
   * 
   */
  const getTotalRaisedFunds = async () => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${TOTAL_RAISED_FUNDS}`,
      typeArguments: [`${PUBLIC_PRESALE}`]
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

  /**
   * 
   * Fetch the total raised funds of the whitelist presale
   * 
   */
  const getWhitelistTotalRaisedFunds = async () => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${TOTAL_RAISED_FUNDS}`,
      typeArguments: [`${WHITELISTED_PRESALE}`]
    };
    let res = await APTOS.view({ payload });
    console.log('total raised funds: ', res);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWhitelistTotalRaisedFunds(); // Call the returned function to trigger fetch
        setWhitelistTotalRaisedFunds(result as any);
        setWhitelistShouldFetch(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [shouldFetch, account]);

  /**
   *  
   * Fetch the ramaining time of the public presale
   * 
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRemainingTime = async () => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${REMAINING_TIME}`,
      typeArguments: [`${PUBLIC_PRESALE}`]
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

  /**
   * 
   * Fetch the ramaining time of the whitelist presale
   * 
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWhitelistRemainingTime = async () => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${REMAINING_TIME}`,
      typeArguments: [`${WHITELISTED_PRESALE}`]
    };
    let res = await APTOS.view({ payload });
    console.log('remaining time: ', res[0]);
    return res[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWhitelistRemainingTime(); // Call the returned function to trigger fetch
        setRemainingTime(result as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [getWhitelistRemainingTime]);

  /**
   * 
   * Fetch the total contributors of the public presale
   * 
   */
  const getTotalContributors = () => {
    const viewTotalContributors = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TOTAL_CONTRIBUTORS}`,
        typeArguments: [`${PUBLIC_PRESALE}`]
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
    console.log("bSidebar", bSidebar);
    if (bSidebar == 2) {
      setTimeout(() => {
        dispatch(toggleSidebar(0))
      }, 500)
    }
  }, [bSidebar]);

  useEffect(() => {
    getTotalContributors();
  }, []);

  /**
   * 
   * Fetch the total contributors in whitelist presale
   * 
   */
  const getWhitelistTotalContributors = () => {
    const viewTotalContributors = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TOTAL_CONTRIBUTORS}`,
        typeArguments: [`${WHITELISTED_PRESALE}`]
      };
      let res = await APTOS.view({ payload });
      console.log('total contributors number: ', res);
    };
    return viewTotalContributors;
  };

  const fetchWhitelistData = async () => {
    const result = await getWhitelistTotalContributors();
    setTotalContributors(result as any);
  };

  useEffect(() => {
    getWhitelistTotalContributors();
  }, []);

  /**
   * 
   * Fetch the treasury address of the public presale
   * 
   */
  const getTreasuryAddress = () => {
    const viewTreasuryAddress = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TREASURY_ADDRESS}`,
        typeArguments: [`${PUBLIC_PRESALE}`]
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

  /**
   * 
   * Fetch the treasury address of the whitelist presale
   * 
   */
  const getWhitelistTreasuryAddress = () => {
    const viewTreasuryAddress = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TREASURY_ADDRESS}`,
        typeArguments: [`${WHITELISTED_PRESALE}`]
      };
      let res = await APTOS.view({ payload });
      console.log('treasury address: ', res);
    };
    return viewTreasuryAddress;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWhitelistTreasuryAddress();
      setTreasuryAddress(result as any);
    };

    fetchData();
  }, []);

  /**
   * 
   * Fetch the total raised funds, contributed amount, and distributed funds of the account in a public presale
   * 
   */
  const onContribute = async () => {
    console.log(Date.now(), endTime, startTime, parseFloat(count))
    if (account && count && Date.now() < endTime && Date.now() >= startTime) {
      try {
        await contribute(account.address, parseFloat(count));
        getTotalRaisedFunds();
        getContributedAmount(account?.address);
        setShouldFetch(true);
        setCount("0");
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * 
   * Fetch the total raised funds, contributed amount, and distributed funds of the account in a whitelist presale
   * 
   */
  const onWhitelistContribute = async () => {
    console.log(Date.now(), whitelistEndTime, whitelistStartTime, parseFloat(count))
    if (account && whitelistCount && Date.now() < whitelistEndTime && Date.now() >= whitelistStartTime) {
      try {
        await contribute(account.address, parseFloat(count));
        getWhitelistTotalRaisedFunds();
        getWhitelistContributedAmount(account?.address);
        setWhitelistShouldFetch(true);
        setWhitelistCount("0");
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * 
   * Fetch the distributed funds of the account in a public presale
   * 
   */
  const getDistributedFunds = async () => {
    try {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const event = new Events(aptosConfig);
      const distributedFundsEvent = await event.getSaleFundsDistributedEvent();
      const amounts = distributedFundsEvent
        .filter(event => event.data.contributor === account?.address)
        .map(event => event.data.amount);
      setDistributedFunds(Number(amounts[amounts.length - 1]));
      console.log('distributed funds: ', Number(amounts[amounts.length - 1]));
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

  /**
   * 
   * Fetch the distributed funds of the account in a whitelist presale
   * 
   */
  const getWhitelistDistributedFunds = async () => {
    try {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const event = new Events(aptosConfig);
      const distributedFundsEvent = await event.getSaleFundsDistributedEvent();
      const amounts = distributedFundsEvent
        .filter(event => event.data.contributor === account?.address)
        .map(event => event.data.amount);
      setDistributedFunds(Number(amounts[amounts.length - 1]));
      console.log('distributed funds: ', Number(amounts[amounts.length - 1]));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (account) {
      getWhitelistDistributedFunds();
      // getContributedAmount();
    }
  }, [account]);

  /**
   * 
   * Fetch if the public presale is completed
   * 
   */
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

  /**
   * 
   * Fetch if the whitelist presale is completed
   * 
   */
  const getWhitelistPresaleFinalized = async () => {
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
    getWhitelistPresaleFinalized();
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


  /**
   * Helper functions
  */

  /**
   * 
   * @param number 
   * @param decimals 
   * @returns 
   */
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

  /**
   * 
   * @param seconds 
   * @returns 
   */
  function formatSeconds(seconds: number): string {
    let days = Math.floor(seconds / (3600 * 24));
    let hours = Math.floor((seconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    let formattedTime = `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
    return formattedTime;
  }

  /**
   * 
   * @param timestamp 
   * @returns 
   */
  function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);

    const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });

    // dd/mm/yyyy @ hh:mm am/pm UTC
    return `${day} ${month} ${year} @ ${timeString.toLowerCase()}  UTC`;
  }

  /**
   * 
   * @param startTime 
   * @param endTime 
   * @returns 
   */
  function formatRemainingTime(startTime: number, endTime: number): string {
    const remainingTime = endTime - startTime;

    // Calculate days, hours, minutes, and seconds
    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / 3600) % 24;
    const days = Math.floor(seconds / 86400);

    // Format the time components
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');

    return `${formattedDays}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  }


  return (
    <div className="parallax relative" id="cred-point">
      <Header className="" active={2} />
      <div className="w-full h-full pb-16">
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'top', backgroundSize: 'cover' }} className="w-full flex flex-col z-20 relative items-center sm:-mt-10">
          <div className="flex flex-col items-center w-full mt-20 sm:mt-[120px]">
            {
              /* Presale is not created yet */
              !presaleExists ?
                <p className="font-bold text-[42px] lg:text-[58px] mb-9 text-center">
                  $RENA Presale
                </p>
                /* Presale is scheduled */
                : presaleExists && (startTime > Date.now()) && (endTime >= Date.now()) ?
                  /* add another check to see if the presale is scheduled or live */
                  <p className="font-bold text-[42px] lg:text-[58px] mb-9 text-center">
                    Join the $RENA Presale
                  </p>
                  /* Presale is live */
                  : presaleExists && (startTime <= Date.now()) && (endTime >= Date.now()) ?
                    <p className="font-bold text-[42px] lg:text-[58px] mb-9 text-center">
                      Join the $RENA Presale
                    </p>
                    /* Presale is completed */
                    : presaleExists && (endTime <= Date.now()) ?
                      <p className="font-bold text-[42px] lg:text-[58px] mb-9 text-center">
                        $RENA Presale
                      </p>
                      :
                      <p className="font-bold text-[42px] lg:text-[58px] mb-9 text-center">
                        $RENA Presale
                      </p>
            }
            <div className={`flex flex-col items-center w-[95%] sm:w-[400px] bg-[#111] ${!loading ? 'border border-[#666] h-fit' : 'shimmer h-[670px]'} rounded-[8px] py-8 px-6`}>
              {
                !loading &&
                <>
                  {
                    /* Presale is not created yet */
                    !presaleExists ?
                      <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                        <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Date will be announced</p>
                        <p className="text-[22px] font-semibold text-[#CCC]">on <a href="https://twitter.com/0xrenegades" target="_blank" rel="noopener noreferrer">@0xrenegades</a> on X</p>
                      </p>
                      /* Presale is scheduled */
                      : presaleExists && (startTime > Date.now()) && (endTime >= Date.now()) ?
                        /* add another check to see if the presale is scheduled or live */
                        <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                          <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">{formatRemainingTime((Date.now()), startTime)}</p>
                          <p className="text-[22px] font-semibold text-[#CCC]">{formatTimestamp(startTime)}</p>
                        </p>
                        /* Presale is live */
                        : presaleExists && (startTime <= Date.now()) && (endTime >= Date.now()) ?
                          <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                            <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Presale is LIVE</p>
                            <p className="text-[22px] font-semibold text-[#CCC]">Ends in {formatSeconds(remainingTime)}</p>
                          </p>
                          /* Presale is completed */
                          : presaleExists && (endTime <= Date.now()) ?
                            <p className="flex flex-col items-center w-[95%] sm:w-[400px]">
                              <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Presale has ENDED</p>
                              <p className="text-[22px] font-semibold text-[#CCC]">Thank you for participating</p>
                            </p>
                            : null
                  }
                  <div className='flex w-full'>
                    {Date.now() < endTime && Date.now() >= startTime ?
                      <div className='flex justify-center items-center border-2 my-10 bg-[#2DCA63] bg-opacity-20 rounded-[8px] border-[#2DCA63] text-[22px] font-semibold w-full sm:w-[352px] h-[42px]'>
                        You are eligible
                      </div>
                      :
                      <div className='flex flex-col justify-center items-center border-2 my-10 bg-[#FF4040] bg-opacity-20 rounded-[8px] border-[#FF4040] text-[22px] font-semibold w-full sm:w-[352px] h-[66px]'>
                        You are not eligible
                        <p className='text-[16px] font-semibold'>See requirements</p>
                      </div>
                    }
                  </div>
                  <div className="flex w-full items-center justify-between h-[26px] font-semibold text-[22px] mb-[56px]">
                    <p>Total Raised</p>
                    <div className="flex items-center font-semibold text-[22px] gap-4">
                      {
                        /* presale is completed */
                        presaleExists && (endTime < Date.now()) ?
                          <p>{formatNumberWithDecimals(((finalTotalRaisedFunds as number) / ONE_RENEGADES), '8')}</p> :
                          <p>{formatNumberWithDecimals(((totalRaisedFunds as number) / ONE_RENEGADES), '8')}</p>
                      }
                      <img src="/presale/aptos.svg" className="w-[18px] h-[18px]" />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between h-12 font-semibold text-[22px]">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={count}
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*\.?\d{0,4}$/;
                        if (value === '' || regex.test(value)) {
                          setCount(value);
                        }
                      }}
                      className={` ${Date.now() < endTime && Date.now() >= startTime ? "" : "opacity-50"} font-medium w-[199px] sm:w-[259px] px-6 h-12 rounded-[4px] border bg-[#FFF] bg-opacity-10 hover:bg-opacity-20 border-transparent focus:outline-none focus:border-gray-300`}
                      disabled={Date.now() < endTime && Date.now() >= startTime ? false : true}
                    />
                    <div className="flex items-center font-semibold text-[26px] gap-2 sm:gap-4">
                      <p>APT</p>
                      <img src="/presale/aptos.svg" className="w-[24px] h-[24px]" />
                    </div>
                  </div>
                  {connected ?
                    <PrimaryButton onClick={onContribute} className={`z-20 relative ${Date.now() < endTime && Date.now() >= startTime ? "" : "cursor-not-allowed bg-opacity-50 hover:bg-opacity-50"} py-1 w-full !h-fit my-6`}>
                      <p className="text-[18px] font-bold my-2">Send APT</p>
                    </PrimaryButton>
                    :
                    <PrimaryButton onClick={() => dispatch(toggleWalletPanel(true))} className="z-20 relative w-full !h-[48px] my-6">
                      <p className="text-[18px] h-6 font-bold">Connect Wallet</p>
                    </PrimaryButton>
                  }
                  <div className='flex flex-col items-start w-full gap-2'>
                    <p className="flex items-center text-[15px] sm:text-[18px] h-6 font-semibold"><Icon icon={'mdi:dot'} /> Minimum contribution is 1 APT</p>
                    <p className="flex items-center text-[15px] sm:text-[18px] h-6 font-semibold"><Icon icon={'mdi:dot'} /> $RENA will be distributed after the Presale</p>
                  </div>
                  <div className="border-b border-[#666] w-full my-6" />
                  <div className="flex w-full items-center justify-between h-[18px] font-semibold text-[18px]">
                    <p className="text-[18px] font-medium text-[#CCC]">My Contribution</p>
                    <div className="flex items-center font-semibold text-18px] gap-4">
                      <p>{
                        presaleExists && (Date.now() > startTime) ?
                          formatNumberWithDecimals(((contributedAmount as number) / ONE_RENEGADES), '8') :
                          0
                      }</p>
                      <img src="/presale/aptos.svg" className="w-[18px] h-[18px]" />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between h-[18px] mt-6 mb-4 font-semibold text-[18px]">
                    <p className="text-[18px] font-medium text-[#CCC]">My $RENA</p>
                    <div className="flex items-center font-semibold text-[18px] gap-4">
                      <p>{
                        /* presale ended */
                        presaleExists && (endTime < Date.now()) ?
                          formatNumberWithDecimals(((distributedFunds as number) / ONE_RENEGADES), '4') :
                          0
                      }</p>
                      <img src="/renegades/rena.svg" className="w-[18px] h-[18px]" />
                    </div>
                  </div>
                </>
              }
            </div>
            <div className={`flex flex-col items-center w-[95%] sm:w-[400px] bg-[#111] ${!loading ? 'border border-[#666] h-fit' : 'shimmer h-[144px]'} mt-5 rounded-[8px] py-8 px-6`}>
              {!loading &&
                <>
                  <p className="text-[28px] sm:text-[32px] leading-[38px] font-bold">Public Presale</p>
                  <p className="text-[20px] text-[#CCC] sm:text-[22px] leading-[38px] font-semibold">{formatRemainingTime((Date.now()), startTime)}</p>
                </>
              }
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