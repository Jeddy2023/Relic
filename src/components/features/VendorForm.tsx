import React, { useState } from 'react';
import { Alert, Button, Group } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VendorFormData, vendorSchema } from '../../utils/schemas/schemas';
import { styles } from '../Styles/styles';
import Input from '../common/Input';
import { api } from '../../api/axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

const VendorForm: React.FC<Props> = ({ prevStep, nextStep }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: { role: 'SELLER' },
  });

  const registerVendor = async (data: VendorFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register/vendor', data);
      const verificationToken: string = response?.data?.verificationToken;
      Cookies.set('verificationTokenRelic', verificationToken);
      toast.success(response.data.message || 'Registration successful!');
      reset();
      nextStep();
    } catch (err: any) {
      const errorMessage = err.response?.data?.errors[0] || err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const submitData: SubmitHandler<VendorFormData> = (data, e) => {
    e?.preventDefault();
    registerVendor(data);
  };

  return (
    <div className="w-full">
      <header className="mb-6">
        <h2 className={`${styles.title} text-2xl md:text-3xl`}>Create a Vendor Account</h2>
        <p className="text-lg">Welcome to <span className="text-[#32c36c]">Relic</span></p>
      </header>
      <form onSubmit={handleSubmit(submitData)} className="space-y-4">
        {error && (
          <Alert
            variant="light"
            color="red"
            title="Error"
            styles={{ label: { fontSize: '16px' }, body: { gap: '.25rem' } }}
            className="mb-4"
          >
            {error}
          </Alert>
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            id="email"
            register={register}
            error={errors.email?.message}
            type="email"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            id="password"
            register={register}
            error={errors.password?.message}
            type={showPassword ? 'text' : 'password'}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label="Username"
            placeholder="Enter your username"
            id="username"
            register={register}
            error={errors.username?.message}
            type="text"
          />
          <Input
            label="First Name"
            placeholder="Enter your first name"
            id="firstname"
            register={register}
            error={errors.firstname?.message}
            type="text"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            id="lastname"
            register={register}
            error={errors.lastname?.message}
            type="text"
          />
          <Input
            label="Shop Name"
            placeholder="Enter your shop name"
            id="shopname"
            register={register}
            error={errors.shopname?.message}
            type="text"
          />
        </div>
        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          id="phonenumber"
          register={register}
          error={errors.phonenumber?.message}
          type="tel"
        />
        <Group justify="center" mt="xl" align="column" gap="md">
          <Button color='#32c36c' variant="light" onClick={prevStep}>Back</Button>
          <Button type="submit" color='#32c36c' loading={loading}>Next</Button>
        </Group>
      </form>
    </div>
  );
};

export default VendorForm;
