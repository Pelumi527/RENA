import React from 'react';

interface CheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onToggle }) => {
  const activeSrc = "/component/checkbox-active.svg";
  const inactiveSrc = "/component/checkbox-inactive.svg";

  return (
    <img
      src={isChecked ? activeSrc : inactiveSrc}
      className="w-[32px] h-[32px] cursor-pointer"
      onClick={onToggle}
      alt="Checkbox"
    />
  );
};

export default Checkbox;