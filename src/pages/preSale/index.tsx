import React, { useEffect, useState } from 'react';
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useDispatch } from "react-redux";
import Sidebar from "./sidebar/sidebar";
import PrimaryButton from "../../components/primaryButton";
import { AccountAddress, AptosConfig, GetEventsResponse, ViewRequest } from "@aptos-labs/ts-sdk";
import { APTOS, RENA_PRESALE_TESTNET } from "../../util/module-endpoints";
import { Network } from 'aptos';
import { Events } from '../../api';
import { toggleWalletPanel } from '../../state/dialog';

const PreSale = () => {
  const { connected, account } = useWallet();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>();
  const [liveTime, setLiveTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState("/presale/bg-presale.svg");

  const [presaleEvent, setPresaleEvent] = useState<GetEventsResponse | null>(null);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const aptosConfig = new AptosConfig({ network: Network.TESTNET });
        const event = new Events(aptosConfig);
        const events = await event.getPresaleCreatedEvent();
        const startTime = Number(events[0].data.start);
        const endTime = Number(events[0].data.end);
        console.log(Date.now(), events);
        setEndTime(endTime);
        setStartTime(startTime);
        setLiveTime(startTime - Date.now());
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyRena = async () => {
    try {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const event = new Events(aptosConfig);
      const events = await event.getContributionsUpdatedEvent();
      console.log(events)
    } catch (error) {
      console.error(error);
    }
  }

  const formatTime = () => {
    if (liveTime <= 0) return '00d 00h 00m 00s';
    let seconds = Math.floor(liveTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    return `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const formatDate = () => {
    if (!startTime) return 'Loading...';
    const date = new Date(startTime);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' @' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  return (
    <div className="parallax relative" id="cred-point">
      <Header className="" active={2} />
      <div className="w-full h-full pb-16">
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'top', backgroundSize: 'cover' }} className="w-full flex flex-col z-20 relative items-center sm:-mt-10">
          <div className="flex flex-col items-center w-full mt-20 sm:mt-[120px]">
            <p className="font-bold text-[42px] lg:text-[58px] mb-9">
              Join the Presale
            </p>
            <div className="flex flex-col items-center w-[95%] sm:w-[400px] h-[540px] bg-[#111] border border-[#666] rounded-[8px] py-8 px-6">
              <p className="text-[32px] leading-[38px] font-bold">{Date.now() > endTime ? "Presale has ENDED" : Date.now() >= startTime ? "Presale is LIVE" : formatTime()}</p>
              <p className="text-[22px] font-semibold text-[#CCC]">{formatDate()}</p>
              <div className="flex w-full items-center justify-between h-[26px] font-semibold text-[22px] my-[56px]">
                <p>Total Raised</p>
                <div className="flex items-center font-semibold text-[22px] gap-4">
                  <p>0</p>
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
                />
                <div className="flex items-center font-semibold text-[26px] gap-2 sm:gap-4">
                  <p>APT</p>
                  <img src="/presale/aptos.svg" className="w-[24px] h-[24px]" />
                </div>
              </div>
              {connected ?
                <PrimaryButton onClick={handleBuyRena} className={`z-20 relative w-full !h-[48px] my-6 ${Date.now() < startTime || Date.now() > endTime ? 'opacity-30 cursor-not-allowed' : ''}`}>
                  <p className="text-[18px] h-6 font-bold">BUY $RENA</p>
                </PrimaryButton>
                :
                <PrimaryButton onClick={() => dispatch(toggleWalletPanel(true))} className="z-20 relative w-full !h-[48px] my-6">
                  <p className="text-[18px] h-6 font-bold">Connect Wallet</p>
                </PrimaryButton>
              }
              <p className="text-[18px] h-6 font-semibold">Minimum contribution is 1 APT</p>
              <div className="border-b border-[#666] w-full my-6" />
              <div className="flex w-full items-center justify-between h-[26px] font-semibold text-[22px]">
                <p className="text-[18px] font-medium text-[#CCC]">Total Contributed</p>
                <div className="flex items-center font-semibold text-[22px] gap-4">
                  <p>0</p>
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
