import React, { ReactNode } from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  content: ReactNode;
  styling:string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick,content,styling }) => {
  return (
    <button
      className={styling}
      onClick={onClick}
    >
      {content} 
    </button>
  );
};

export default CustomButton;
