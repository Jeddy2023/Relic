import React, { useEffect, useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Confetti from 'react-confetti';
import CustomerForm from '../components/features/CustomerForm';
import VendorForm from '../components/features/VendorForm';
import SignUpImage from '../assets/images/Signup2.jpeg'
import TermsOfUse from '../components/features/TermsOfUse';
type Props = {}

type UserType = 'customer' | 'vendor' | null;

const SignupPage: React.FC<Props> = ({ }) => {
    const [userType, setUserType] = useState<UserType>(null);
    const [transparentButton, setTransparentButton] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(0);

    const handleUserTypeSelect = (type: UserType) => {
        setUserType(type);
    };

    const handleButtonClick = (buttonName: string) => {
        setTransparentButton(prev => prev === buttonName ? null : buttonName);
    };

    const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

    useEffect(() => {
        if (active === 3) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [active]);

    return (
        <>
            {showConfetti && <Confetti />}
            <div className="auto-container center-margin p-4 flex flex-col lg:flex-row dark:bg-[#000000eb] dark:text-gray-100">
                <div className="flex-1 lg:w-2/3 lg:pr-8 h-full flex flex-col justify-center">
                    <Link to="/" className="flex items-center text-green-500 mb-4 dark:text-green-300">
                        <IoIosArrowBack className="text-2xl" />
                        <span className="ml-2">Back home</span>
                    </Link>
                    <br />
                    <Stepper color='#32c36c' active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                        <Stepper.Step label="First step" description="Select user account">
                            <div>
                                <h2 className="text-2xl font-semibold mt-4 dark:text-gray-100">What Do You Want To Be</h2>
                                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                                    <Button
                                        color='#32c36c'
                                        className={`w-full h-24 text-[1.5rem] ${transparentButton === 'customer' ? 'bg-[#32c36c79] text-white' : 'bg-transparent text-[#32c36c] border border-[#32c36c] dark:border-[#32c36c]'}`}
                                        onClick={() => {
                                            handleUserTypeSelect('customer');
                                            handleButtonClick('customer');
                                        }}
                                    >
                                        A Customer
                                    </Button>
                                    <Button
                                        color='#32c36c'
                                        className={`w-full h-24 text-[1.5rem] ${transparentButton === 'vendor' ? 'bg-[#32c36c79] text-white' : 'bg-transparent text-[#32c36c] border border-[#32c36c] dark:border-[#32c36c]'}`}
                                        onClick={() => {
                                            handleUserTypeSelect('vendor');
                                            handleButtonClick('vendor');
                                        }}
                                    >
                                        A Vendor
                                    </Button>
                                </div>
                            </div>
                            <Group justify="center" mt="xl" mb="xl">
                                <Button onClick={() => {
                                    if (userType === null) {
                                        toast.error('Please select the type of user you want to be');
                                        return;
                                    }
                                    nextStep();
                                }} color='#32c36c'>
                                    Next
                                </Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step label="Second step" description="Create an Account">
                            {userType === 'customer' ? <CustomerForm prevStep={prevStep} nextStep={nextStep} /> : <VendorForm prevStep={prevStep} nextStep={nextStep} />}
                        </Stepper.Step>
                        <Stepper.Step label="Final step" description="Terms of Use">
                            <TermsOfUse prevStep={prevStep} nextStep={nextStep} />
                        </Stepper.Step>
                        <Stepper.Completed>
                            <div className="dark:text-gray-100">
                                <br />
                                <h2 className="text-2xl font-semibold">Congratulations! You've successfully completed the sign-up process.</h2>
                                <br />
                                <p className="mt-2">Please go back to the homepage to log in and start using your account.</p>
                                <br />
                                <Button color='#32c36c' onClick={() => navigate('/')}>Go back to home</Button>
                            </div>
                        </Stepper.Completed>
                    </Stepper>

                    <div className='text-center mt-4 dark:text-gray-100'>
                        <span>
                            Already have an account?
                            <Link to="/" className="text-green-500 ml-2 dark:text-green-300">Sign in</Link>
                        </span>
                    </div>
                </div>
                <div className='hidden lg:block lg:w-1/3 h-full rounded-tl-full rounded-br-full overflow-hidden'>
                    <img src={SignUpImage} alt="Signup" className="w-full h-full object-fill"  />
                </div>
            </div>
        </>
    );
}

export default SignupPage;
