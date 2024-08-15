import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from '../../hooks/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      {theme === 'light' ? (
        <IoMoonOutline size={25} title="Switch to Dark Mode" color={'#1f2937'}/>
      ) : (
        <BiSun size={25} title="Switch to Light Mode" color='white'/>
      )}
    </div>
  );
};

export default ThemeSwitcher;
