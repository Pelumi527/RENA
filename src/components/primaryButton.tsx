interface Props {
  className?: string;
  onClick?: () => void;
  children?: any;
}
const PrimaryButton: React.FC<Props> = ({ className, onClick: onChange, children }) => {
  return (
    <button
      className={`text-[#000] font-semibold bg-primary hover:bg-primary-hover active:bg-primary-active rounded-[4px] px-6 py-2 ${className}`}
      onClick={onChange}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
