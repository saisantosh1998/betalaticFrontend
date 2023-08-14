import React from 'react';

interface TextareaComponentProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  styling: string
}

const TextareaComponent: React.FC<TextareaComponentProps> = ({ label, value,styling, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mt-4 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styling}
        rows={6}
      />
    </div>
  );
};

export default TextareaComponent;
