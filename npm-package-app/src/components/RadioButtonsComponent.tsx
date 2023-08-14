// RadioButtonsComponent.tsx

import React from 'react';

interface RadioButtonsComponentProps {
  options: string[];
  selectedOption: string;
  onOptionChange: (newOption: string) => void;
}

const RadioButtonsComponent: React.FC<RadioButtonsComponentProps> = ({
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="mb-4 flex no-scrollbar flex-col max-h-[300px] min-h-[300px] overflow-y-auto border border-gray-300 rounded-md p-2">
      {options.map((option) => (
        <label key={option} className="block mb-2">
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => onOptionChange(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonsComponent;
