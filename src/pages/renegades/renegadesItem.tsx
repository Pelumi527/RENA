import { Icon } from "@iconify/react";
import LoadingImage from "../../components/loadingImage";
import { useAppSelector } from "../../state/hooks";
import { levelClass } from "../../util/renegadeUtils";
import Checkbox from "../../components/checkBox";
import React from 'react';
import { Tooltip } from "@material-tailwind/react";

interface Props {
  avatar?: string;
  name?: string;
  index: number
  rank?: number;
  onClick?: () => void;
  isSelected: boolean;
  onToggleSelected: () => void;
}

const RenegadesItem = ({ avatar, name, rank, onClick, isSelected, onToggleSelected, index }: Props) => {

  const isLoading = useAppSelector(
    (state) => state.renegadesState.isRenaLoading
  );
  const displayAmount = useAppSelector(
    (state) => state.renegadesState.displayAmount
  );
  return (
    <>
      {index <= displayAmount - 1
        ?
        <div onClick={onClick} className="relative w-[153px] h-[216px] sm:w-[194px] sm:h-[261px] cursor-pointer flex flex-col items-center">
          <div className="absolute top-0 right-0 p-2 z-[200]" onClick={(e) => e.stopPropagation()}>
            <Checkbox isChecked={isSelected} onToggle={onToggleSelected} />
          </div>
          <div className={`overflow-hidden rounded-[8px] w-[153px] sm:w-[194px] relative`}>
            <LoadingImage url={avatar} className="w-full h-[153px] sm:h-[194px] rounded-[8px] object-cover transition-transform duration-300 ease-in-out hover:scale-[120%]" />
            {isSelected && <div className={`absolute top-0 left-0 w-full h-full bg-[#000] bg-opacity-40 rounded-[8px] z-[100] ${isSelected ? 'border-[5px] border-primary' : ''}`}></div>}
          </div>
          {isLoading ?
            <div className="w-[141px] h-[26px] bg-gray-loading mt-4" />
            :
            <p className="text-[18px] sm:text-[22px] font-semibold text-center mt-4">{name}</p>
          }
          <Tooltip
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="z-[100]"
            content={
              <div className="w-fit h-fit text-[14px] font-medium p-2 bg-[#000] border border-[#626262] rounded-[4px] z-[100] relative">
                {rank && levelClass(rank)[1]}
              </div>
            }
          >
            <div className={`text-[15px] font-bold flex items-center justify-center ${rank && levelClass(rank)[0]}`}>
              <Icon icon={'ph:medal-fill'} fontSize={16} className={`mr-1 ${rank && levelClass(rank)[0]}`} />
              Rank {rank}
              <p className="text-[#666] font-semibold">/5000</p>
            </div>
          </Tooltip>
        </div>
        :
        <div className="relative w-[153px] h-[216px] sm:w-[194px] sm:h-[261px] cursor-pointer flex flex-col items-center" >
          <div className="w-full h-[153px] sm:h-[194px] bg-gray-loading rounded-[8px] z-[100]" />
          <div className="w-[141px] h-[26px] bg-gray-loading mt-4" />
        </div>
      }
    </>
  );
};

export default RenegadesItem;