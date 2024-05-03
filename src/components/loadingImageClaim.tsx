import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateIsRenaLoading } from "../state/renegades";

interface Props {
  width?: number;
  height?: number;
  className?: string;
  url?: string;
}
const LoadingImageClaim: React.FC<Props> = ({
  className,
  url,
  width,
  height,
}) => {
  const [isLoading, toggleLoading] = useState(true);
  const dispatch = useDispatch();
  function onLoad() {
    toggleLoading(false);
    dispatch(updateIsRenaLoading(false));
  }
  return (
    <div
      className={`${
        isLoading
          ? "bg-gray-loading w-[194px] h-[194px] flex justify-center items-center"
          : ""
      } rounded-md `}
    >
      <img
        src="/renegades/rena-gray.svg"
        className="w-[50px] h-[50px]"
        style={{ display: !isLoading ? "none" : "block" }}
      />
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

export default LoadingImageClaim;
