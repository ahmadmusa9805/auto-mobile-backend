import { z } from 'zod';

export const createPricayValidationSchema = z.object({
  body: z.object({
    Pricay: z.object({
      message: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updatePricayValidationSchema = z.object({
  body: z.object({
    Pricay: z.object({
      message: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
