import React from 'react';

interface InputComponentProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  styling: string;
}

const InputComponent: React.FC<InputComponentProps> = ({ label, value, styling, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mt-10 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styling}
      />
    </div>
  );
};

export default InputComponent;
