import React, { useState } from 'react';

interface IFloatingLabelInput {
  label: string;
  type: string;
  name: string;
  id: string;
}

const FloatingLabelInput = ({
  label,
  type = 'text',
  name,
  id,
}: IFloatingLabelInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== '')}
        className="block w-full px-3 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 peer"
        placeholder=" " // Required for floating effect
      />
      <label
        htmlFor={id}
        className={`absolute text-sm text-gray-500 transition-all transform scale-100 -translate-y-4 top-2 left-3 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:scale-90 peer-focus:-translate-y-4 peer-focus:text-purple-500`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
