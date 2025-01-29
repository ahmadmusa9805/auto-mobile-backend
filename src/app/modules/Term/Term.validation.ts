import { z } from 'zod';

export const createTermValidationSchema = z.object({
  body: z.object({
    Term: z.object({
      message: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateTermValidationSchema = z.object({
  body: z.object({
    Term: z.object({
      message: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
