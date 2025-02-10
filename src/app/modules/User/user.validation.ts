import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
      User: z.object({
      fullName: z.string().min(1, 'Full name must be at least 3 characters'),
      contactNo: z.string().min(10, 'Contact number must be at least 10 digits').max(15, 'Contact number cannot exceed 15 digits'), // Adjust min/max as needed
      userName: z.string().min(3, 'Username must be at least 3 characters').optional(),
      email: z.string().email('Invalid email format'),
      location: z.string().min(3, 'Location must be at least 3 characters').optional(),
      password: z.string().min(5, 'Password must be at least 5 characters'), // Consider adding regex for stronger passwords
      passwordChangedAt: z.date().optional(),
      role: z.enum(['client', 'admin', 'supervisor', 'technician']).default('client'),
      dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format').optional(), // Example YYYY-MM-DD format
      profileImg: z.string().optional(), // Allow empty string or undefined
      otpVerified: z.boolean().default(false),
      status: z.enum(['active', 'inactive', 'pending', 'blocked']).default('active'), // Use the actual UserStatus values
      skills: z.array(z.string()).default([]),
      adminClientEmail: z.string().optional(), // Make optional, as it seems specific to certain users
    }),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
      User: z.object({
      fullName: z.string().min(1, 'Full name must be at least 3 characters').optional(),
      contactNo: z.string().min(10, 'Contact number must be at least 10 digits').max(15, 'Contact number cannot exceed 15 digits').optional(), // Adjust min/max as needed
      userName: z.string().min(3, 'Username must be at least 3 characters').optional(),
      email: z.string().email('Invalid email format').optional(),
      location: z.string().min(3, 'Location must be at least 3 characters').optional(),
      dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format').optional(), // Example YYYY-MM-DD format
      profileImg: z.string().optional(), // Allow empty string or undefined
      // otpVerified: z.boolean().default(false),
      status: z.enum(['active', 'blocked']).default('active').optional(), // Use the actual UserStatus values
      skills: z.array(z.string()).default([]).optional(),
      adminClientEmail: z.string().optional(), // Make optional, as it seems specific to certain users
      isDeleted: z.boolean().default(false).optional(),
    }).optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};



