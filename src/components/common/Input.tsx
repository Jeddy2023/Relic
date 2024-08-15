import React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  Icon?: IconType;
  id: string;
  register: any;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  error,
  Icon,
  id,
  register,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="mb-2 w-full">
      <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={`w-full p-3 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 dark:bg-[#0e0e0ec1] dark:border-[#0e0e0efc] ${error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:text-gray-300`}
        />
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Icon className="text-gray-500 dark:text-gray-400" />
          </div>
        )}
        {setShowPassword !== undefined && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <AiOutlineEye className="text-black dark:text-gray-300" size={20} /> : <AiOutlineEyeInvisible className="text-black dark:text-gray-300" size={20} />}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 dark:text-red-400 text-xs mt-1 block">{error}</span>}
    </div>
  );
};

export default Input;
