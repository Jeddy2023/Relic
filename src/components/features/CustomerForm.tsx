import React, { useState } from 'react';
import { Alert, Button, Group } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerFormData, customerSchema } from '../../utils/schemas/schemas';
import { styles } from '../Styles/styles';
import Input from '../common/Input';
import toast from 'react-hot-toast';
import { api } from '../../api/axios';
import Cookies from 'js-cookie';

type Props = {
    prevStep: () => void;
    nextStep: () => void;
};

const CustomerForm: React.FC<Props> = ({ prevStep, nextStep }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
        defaultValues: { role: 'BUYER' },
    });

    const registerCustomer = async (data: CustomerFormData) => {
        setLoading(true);
        setError(null);
        console.log(data)
        try {
            const response = await api.post('/auth/register/customer', data);
            const verificationToken: string = response?.data?.verificationToken;
            Cookies.set('verificationTokenRelic', verificationToken);
            toast.success(response.data.message || 'Registration successful!');
            reset();
            nextStep();
        } catch (err: any) {
            console.log(err)
            const errorMessage = err.response?.data?.errors[0] || err.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const submitData: SubmitHandler<CustomerFormData> = (data, e) => {
        e?.preventDefault();
        registerCustomer(data);
    };

    return (
        <div className="w-full">
            <header className="mb-6">
                <h2 className={`${styles.title} text-2xl md:text-3xl lg:text-4xl`}>Create a Customer Account</h2>
                <p className="text-sm md:text-base lg:text-lg">Welcome to <span className="text-[#32c36c]">Relic</span></p>
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
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        id="phonenumber"
                        register={register}
                        error={errors.phonenumber?.message}
                        type="tel"
                    />
                </div>
                <Group justify="center" mt="xl" align="column" gap="md">
                    <Button color='#32c36c' variant="light" onClick={prevStep}>Back</Button>
                    <Button type="submit" color='#32c36c' loading={loading}>Next</Button>
                </Group>
            </form>
        </div>
    );
};

export default CustomerForm;
