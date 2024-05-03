interface Props {
  className?: string;
  onClick?: () => void;
  children?: any;
}
const SecondaryButton: React.FC<Props> = ({
  className,
  onClick: onChange,
  children,
}) => {
  return (
    <button
      className={`text-[#000] font-semibold bg-secondary hover:bg-secondary-hover active:bg-secondary-active rounded-[4px] ${className}`}
      onClick={onChange}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
