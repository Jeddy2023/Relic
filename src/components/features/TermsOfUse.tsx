import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Checkbox, Button, Group, Modal, PinInput, Text, Alert } from "@mantine/core";
import { toast } from 'react-hot-toast';
import { IoMailUnreadOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import { api } from '../../api/axios';

interface TermsOfUseProps {
  prevStep: () => void;
  nextStep: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ prevStep, nextStep }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [pin, setPin] = useState('');
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (opened && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, opened]);

  const startCountdown = () => {
    setCountdown(30);
  };

  const handleResendOtp = async () => {
    const verificationToken = Cookies.get('verificationTokenRelic');
    if (!verificationToken) {
      toast.error('Verification token not found.');
      return;
    }

    setResendLoading(true);
    try {
      const response = await api.post('/auth/resend-otp', verificationToken );
      console.log(response)
      const newVerificationToken: string = response?.data?.verificationToken;
      Cookies.set('verificationTokenRelic', newVerificationToken);
      toast.success(response.data.message || 'Otp has been resent successfully!');
      startCountdown();
    } catch (err: any) {
      console.log(err)
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP. Please try again.';
      toast.error(errorMessage);
      setOtpError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!pin || pin.length !== 6) {
      setOtpError('OTP must be 6 characters long.');
      return;
    }

    const verificationToken = Cookies.get('verificationTokenRelic');
    if (!verificationToken) {
      toast.error('Verification token not found.');
      return;
    }

    setVerifyLoading(true);
    try {
      const response = await api.post('/auth/verify-email', { otp: pin, verificationToken });
      console.log(response)
      toast.success(response.data.message || 'Email verified successfully!');
      setPin('')
      nextStep();
    } catch (err: any) {
      console.log(err)
      const errorMessage = err.response?.data?.message || 'Failed to verify OTP. Please check the code and try again.';
      toast.error(errorMessage);
      setOtpError(errorMessage);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    if (otpError) {
      setOtpError('');
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <header className="mb-2 sm:mb-4">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Terms of Use</h1>
        <p className="text-xs sm:text-sm md:text-base font-medium text-gray-500">Welcome to Relic</p>
      </header>
      <article className="text-sm sm:text-base md:text-lg">
        Please read these <Link to="#" className="text-green-600 font-medium">Terms</Link> carefully before using the Product. By using the Product, you agree to be bound by these <Link to="#" className="text-green-600 font-medium">Terms</Link> and our <Link to="#" className="text-green-600 font-medium">Privacy Policy</Link>, which is incorporated into these Terms by reference. If you do not agree to these Terms, you may not use the Product.
      </article>
      <Checkbox
        label="I agree to these terms"
        className="mt-6 sm:mt-8"
        color="green"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      <div className="flex justify-center gap-2 mt-6 sm:mt-8 md:mt-10">
        <Group justify="center" gap="md">
          <Button onClick={prevStep} color="green" variant="light">Back</Button>
          <Button
            loading={verifyLoading}
            onClick={() => {
              if (isChecked) {
                setOpened(true);
                startCountdown();
              } else {
                toast.error('You have not accepted our Terms Of Use, Check the Checkbox.');
              }
            }}
            color="green"
          >
            Next
          </Button>
        </Group>
      </div>

      <Modal opened={opened} onClose={() => {
        setOpened(false)
        setPin('')
      }} centered title="Enter OTP">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <IoMailUnreadOutline color="#32c36c" size={50} />
          <p className="text-center text-sm sm:text-base md:text-lg">
            Please enter the code sent to your email
            <span className="text-green-600"> User's Email</span>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 sm:gap-6">
            {otpError && (
              <Alert
                variant="light"
                color="red"
                title="Error"
                styles={{ label: { fontSize: '16px' }, body: { gap: '.25rem' } }}
                className="w-full"
              >
                {otpError}
              </Alert>
            )}
            <PinInput
              oneTimeCode
              length={6}
              value={pin}
              onChange={handlePinChange}
            />
            <Button type="submit" color="green" variant="light" mt={10} mb={5} loading={verifyLoading}>
              Verify Email
            </Button>
          </form>
          {countdown > 0 ? (
            <Text size="sm" className="mt-4">Resend OTP {countdown > 0 && `(${countdown}s)`}</Text>
          ) : (
            <Button color="green" variant="light" size="xs" onClick={handleResendOtp} loading={resendLoading}>
              Resend OTP
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default TermsOfUse;
