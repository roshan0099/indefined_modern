import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea
      className={`w-full bg-light-gray-bg border border-gray-300 text-black placeholder-gray-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors duration-300 resize-none ${props.className}`}
      rows={4}
      {...props}
    />
  );
};

export default Textarea;