import React from 'react';

interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

const Button = ({ label, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-white px-4 py-2 h-12 rounded-md font-bold uppercase ${className} active:bg-secondary select-none`}
    >
      {label}
    </button>
  );
};

export default Button;
