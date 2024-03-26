import { Icon } from "@iconify/react";
import LoadingImage from "../../components/loadingImage";
import { useAppSelector } from "../../state/hooks";

interface Props {
  avatar?: string;
  name?: string;
  rank?: string;
  level?: number;
  onClick?: () => void;
}

const RenegadesItem = ({ avatar, name, rank, level, onClick }: Props) => {

  const isLoading = useAppSelector(
    (state) => state.renegadesState.isRenaLoading
  );
  const levelClass = () => {
    switch (level) {
      case 1: return 'text-[#B83032]';
      case 2: return 'text-[#FFC539]';
      case 3: return 'text-[#218380]';
      case 4: return 'text-[#FFF]';
      default: return 'text-gray-500';
    }
  }

  return (
    <div onClick={onClick} className="w-[153px] h-[216px] sm:w-[194px] sm:h-[261px] cursor-pointer flex flex-col items-center">
      <div className="overflow-hidden rounded-[8px] w-[153px] sm:w-[194px]">
        <LoadingImage url={avatar} className="w-full h-[153px] sm:h-[194px] rounded-[8px] object-cover transition-transform duration-300 ease-in-out hover:scale-[120%]" />
      </div>
      {isLoading ?
        <div className="w-[141px] h-[26px] bg-gray-loading mt-4" />
        :
        <p className="text-[18px] sm:text-[22px] font-semibold text-center mt-4">{name}</p>
      }
      {/* <div className={`text-[15px] font-bold flex items-center justify-center ${levelClass()}`}>
        <Icon icon={'ph:medal-fill'} fontSize={16} color={levelClass()} className="mr-1" />
        Rank {rank}
        <p className="text-[#666] font-semibold">/5000</p>
      </div> */}
    </div>
  );
};

export default RenegadesItem;