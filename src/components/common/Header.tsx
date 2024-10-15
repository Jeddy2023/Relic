import { useContext, useState } from 'react';
import { ActionIcon, Button, Flex, Stack } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoPersonOutline, IoCloseSharp } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
import Logo from '../../assets/images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import ThemeSwitcher from './ThemeSwitcher';
import SignInModal from '../features/SignInModal';
import { UserContext } from '../../hooks/userContext';

type Props = {};

const Header: React.FC<Props> = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { accessToken } = useContext(UserContext);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  }

  return (
    <nav className="auto-container center-margin custom-side-padding flex items-center justify-between bg-opacity-40 bg-[whitesmoke] dark:bg-[#0e0e0efc] transition-colors duration-300 ease-in-out">
      <Link to="/" className="flex items-center w-36 h-20">
        <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-grow items-center justify-center gap-6">
        <Link to="/" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>Home</h2>
        </Link>
        <Link to="/about" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>About</h2>
        </Link>
        <Link to="/auctions" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>Auctions</h2>
        </Link>
        <Link to="/contact" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>Contact</h2>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeSwitcher />
        <ActionIcon onClick={() => setOpenSidebar(!openSidebar)} bg='transparent' className='z-[100000]'>
          {openSidebar ? <IoCloseSharp size={25} className="text-gray-800 dark:text-gray-200" /> : <HiMenuAlt3 size={25} className="text-gray-800 dark:text-gray-200" />}
        </ActionIcon>
      </div>

      <Flex align="center" gap={5} className="hidden md:flex">
        {!accessToken && <Flex gap={5}>
          <Link to="/register">
            <Button color={'#48bb78'} className="hover:bg-bg-general dark:hover:bg-bg-general-dark transition duration-300">
              Sign up
            </Button>
          </Link>
          <SignInModal />
        </Flex>}
        <ActionIcon bg='transparent' className="">
          <ThemeSwitcher />
        </ActionIcon>
        <ActionIcon bg='transparent' className="">
          <IoSearchOutline size={25} className="text-gray-800 dark:text-gray-200" />
        </ActionIcon>
        <ActionIcon bg='transparent' className="relative cursor-pointer overflow-visible">
          <GoBell size={25} className="text-gray-800 dark:text-gray-200" />
          <span className="absolute top-[-11px] right-[-7px] bg-bg-general dark:bg-bg-general-dark rounded-full text-white text-xs font-semibold w-5 h-5 flex items-center justify-center">0</span>
        </ActionIcon>
        <Link to="/">
          <IoPersonOutline size={25} className="text-gray-800 dark:text-gray-200" />
        </Link>
      </Flex>

      {/* Responsive Drawer */}

      {
        openSidebar && (
          <div className="fixed w-[50%] h-screen top-0 right-0 z-[99999] bg-[whitesmoke] dark:bg-[#0e0e0ef6] pt-16 pl-[7%]" onClick={handleClose} id='screen'>
            <Stack gap="md" className='relative'>

              <Link to="/" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>Home</h2>
              </Link>
              <Link to="/about" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>About Us</h2>
              </Link>
              <Link to="/auctions" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>Auctions</h2>
              </Link>
              <Link to="/contact" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>Contact</h2>
              </Link>
              <Link to="/register">
                <Button color={'#48bb78'}>Sign up</Button>
              </Link>
              <div>
                <Button color={'#48bb78'} variant="outline">
                  Sign in
                </Button>
              </div>
            </Stack>
          </div>
        )
      }
    </nav>
  );
};

export default Header;
