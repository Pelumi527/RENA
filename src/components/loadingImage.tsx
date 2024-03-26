import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateIsRenaLoading } from "../state/renegades";

interface Props {
  width?: number;
  height?: number;
  className?: string;
  url?: string;
}
const LoadingImage: React.FC<Props> = ({ className, url, width, height }) => {
  const [isLoading, toggleLoading] = useState(true);
  const dispatch = useDispatch();
  function onLoad() {
    toggleLoading(false);
    dispatch(updateIsRenaLoading(false));
  }
  return (
    <div
      className={`${isLoading ? "bg-gray-loading w-full h-[153px] sm:h-[194px]" : ""
        } rounded-md `}
    >
      <img
        src={url}
        className={`rounded-md ${className}`}
        alt="nft"
        onLoad={onLoad}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default LoadingImage;
