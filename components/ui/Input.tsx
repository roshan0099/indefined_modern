import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className={`w-full bg-gray-100 dark:bg-white/5 border-0 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 py-4 px-6 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10 ${props.className}`}
      {...props}
    />
  );
};

export default Input;