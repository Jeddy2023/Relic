import { z, ZodSchema } from 'zod';

export type VendorFormData = {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    shopname: string;
    role: string;
    phonenumber: string; // Added phone number
};

export const vendorSchema: ZodSchema<VendorFormData> = z.object({
    email: z.string().email('Invalid email address').trim(),
    password: z.string()
        .min(5, { message: "Password must contain at least 5 characters" })
        .max(16, { message: "Password should be less than 16 characters" })
        .refine(value => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(value), { message: "Password must contain at least one uppercase letter and one symbol" }),
    username: z.string().trim().min(1, 'Username is required'),
    firstname: z.string().trim().min(1, 'First name is required'),
    lastname: z.string().trim().min(1, 'Last name is required'),
    shopname: z.string().trim().min(1, 'Shop name is required'),
    role: z.string().trim().min(1, 'Role is required'),
    phonenumber: z.string().regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits')
});

export type CustomerFormData = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
    phonenumber: string;
};

export const customerSchema: ZodSchema<CustomerFormData> = z.object({
    email: z.string().email('Invalid email address').trim(),
    password: z.string()
        .min(5, { message: "Password must contain at least 5 characters" })
        .max(16, { message: "Password should be less than 16 characters" })
        .refine(value => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(value), { message: "Password must contain at least one uppercase letter and one symbol" }),
    firstname: z.string().trim().min(1, 'First name is required'),
    lastname: z.string().trim().min(1, 'Last name is required'),
    role: z.string().trim().min(1, 'Role is required'),
    phonenumber: z.string().regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits')
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(5, { message: "Password must contain at least 5 characters" })
        .max(16, { message: "Password should be less than 16 characters" })
        .refine(value => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(value), { message: "Password must contain at least one uppercase letter and one symbol" }),
});