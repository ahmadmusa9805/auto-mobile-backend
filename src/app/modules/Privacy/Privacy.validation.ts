import { z } from 'zod';

export const createPrivacyValidationSchema = z.object({
  body: z.object({
    Privacy: z.object({
      message: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updatePrivacyValidationSchema = z.object({
  body: z.object({
    Privacy: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      atcCodes: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
