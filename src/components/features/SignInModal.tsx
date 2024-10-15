import { Modal, Button } from '@mantine/core';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormData, signInSchema } from '../../utils/schemas/schemas';
import { UserContext } from '../../hooks/userContext';
import { api } from '../../api/axios';
import { ApiError } from '../../utils/apiHelpers';
import { Link } from 'react-router-dom';
import Input from '../common/Input';
import { getCurrentTheme } from '../../hooks/ThemeContext';
import '../../assets/styles/modal.css';

type Props = {};

const SignInModal: React.FC<Props> = () => {
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [theme, setTheme] = useState(getCurrentTheme())

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", data);
            login(response?.data);
            toast.success(response?.data?.message || 'Sign in successful!');
            reset();
            setOpened(false);
        } catch (error) {
            console.log(error);
            const err = error as ApiError;
            toast.error(err.response?.data?.message || 'Sign in failed!');
        } finally {
            setIsLoading(false);
        }
    };

    console.log(theme)

    return (
        <>
            <div className="mantine-custom-modal">
                <Modal
                    bg={'red'}
                    opened={opened}
                    onClose={() => {
                        setOpened(false);
                        reset();
                    }}
                    title={
                        <Link to="/" className="font-bold">
                            Relic
                        </Link>
                    }
                    centered
                    className="dark"
                >
                    <div className="login-form">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">Welcome Back</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">We've missed you so much</p>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-[2%]">
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                id="email"
                                register={register}
                                error={errors.email?.message}
                                type="text"
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                id="password"
                                register={register}
                                error={errors.password?.message}
                                type={showPassword ? 'text' : 'password'}
                            />
                            <div className="space-y-3 mt-5">
                                <Button
                                    fullWidth
                                    type="submit"
                                    loading={isLoading}
                                    className="bg-bg-general hover:bg-bg-general-dark"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <span className="text-sm text-black dark:text-white">
                                Don't have an account?
                                <Link to="/register" className="text-[#32c36c] ml-1">Sign Up</Link>
                            </span>
                        </div>
                    </div>
                </Modal>
            </div>

            <Button color={'#48bb78'} variant="outline" className="transition duration-300" onClick={() => setOpened(true)}>
                Sign in
            </Button>
        </>
    );
};

export default SignInModal;
