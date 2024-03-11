import { Icon } from "@iconify/react";

interface Props {
  avatar?: string;
  name?: string;
  rank?: string;
  level?: number;
  onClick?: () => void;
}

const RenegadesItem = ({ avatar, name, rank, level, onClick }: Props) => {

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
    <div onClick={onClick} className="w-[194px] h-[261px] cursor-pointer">
      <img src={avatar} className="w-[194px] h-[194px] rounded-[8px]" alt={name} />
      <p className="text-[22px] font-semibold text-center mt-4">{name}</p>
      <div className={`text-[15px] font-bold flex items-center justify-center ${levelClass()}`}>
        <Icon icon={'ph:medal-fill'} fontSize={16} color={levelClass()} className="mr-1" />
        Rank {rank}
        <p className="text-[#666] font-semibold">/5000</p>
      </div>
    </div>
  );
};

export default RenegadesItem;