import React from 'react';
import { Button } from '@mantine/core';
import { MdVerifiedUser } from 'react-icons/md';
import { BiArrowFromLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Hero: React.FC<Props> = ({ }) => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col md:flex-row w-full items-stretch gap-4 overflow-hidden py-12 bg-'>
            <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 bg-[#f5f5f5c1] dark:bg-[#0e0e0ec1] p-7 flex-1">
                <div className="mb-4">
                    <h1 className="text-gray-800 dark:text-white text-4xl md:text-6xl font-extrabold leading-tight">
                        Discover Your Perfect Match
                    </h1>
                </div>
                <div className="mb-8 max-w-lg">
                    <p className="text-gray-800 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                        Dive into our exclusive range of products and find exactly what you’ve been looking for. At <span className="text-green-600">Relic</span>, your perfect match awaits.
                    </p>
                </div>
                <Button
                    className="font-bold text-base md:text-lg"
                    color="teal"
                    size="sm"
                    variant="light"
                    leftSection={<MdVerifiedUser size={16} />}
                    rightSection={<BiArrowFromLeft size={16} />}
                    onClick={() => {
                        navigate('/register')
                    }}
                >
                    Explore Now
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 bg-[#f5f5f5c1] dark:bg-[#0e0e0ec1] p-7 flex-1">
                <div className="mb-4">
                    <h1 className="text-gray-800 dark:text-white text-4xl md:text-6xl font-extrabold leading-tight">
                        Upgrade Your Collection
                    </h1>
                </div>
                <div className="mb-8 max-w-lg">
                    <p className="text-gray-800 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                        Elevate your collection with unique finds and exclusive deals. Join us at <span className="text-green-600">Relic</span> and start enhancing your treasures today.
                    </p>
                </div>
                <Button
                    className="font-bold text-base md:text-lg"
                    color="teal"
                    size="sm"
                    variant="light"
                    leftSection={<MdVerifiedUser size={16} />}
                    rightSection={<BiArrowFromLeft size={16} />}
                    onClick={() => {
                        navigate('/register')
                    }}
                >
                    Start Upgrading
                </Button>
            </div>
        </div>
    );
}

export default Hero;
