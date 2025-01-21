import { z } from 'zod';

export const AuthBaseSchema = z.object({
  name: z
    .string()
    .min(1, 'The name must be between 1 and 50 characters long')
    .max(50, 'The name must be between 1 and 50 characters long')
    .regex(/^[a-zA-Z\s]+$/, 'The name can only contain letters and spaces')
    .trim(),
  email: z
    .string()
    .trim()
    .email('Email must be in a valid format'),
  password: z
    .string()
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'Password must contain at least one special character'
    )
    .min(5, 'Password must be at least 5 characters long'),
});

export const RegisterSchema = AuthBaseSchema.extend({
  confirmPassword: z
    .string()
    .min(1, { message: 'Password confirmation is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export const LoginSchema = AuthBaseSchema.pick({
  email: true,
  password: true,
});
