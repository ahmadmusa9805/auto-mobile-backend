import { z } from 'zod';

export const createDashboardValidationSchema = z.object({
  body: z.object({
    Dashboard: z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      atcCodes: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateDashboardValidationSchema = z.object({
  body: z.object({
    Dashboard: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      atcCodes: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
