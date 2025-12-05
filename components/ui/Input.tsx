import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className={`w-full bg-light-gray-bg border border-gray-300 text-black placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-300 ${props.className}`}
      {...props}
    />
  );
};

export default Input;