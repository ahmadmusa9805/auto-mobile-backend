import { z } from 'zod';

export const createNotificationValidationSchema = z.object({
  body: z.object({
    Notification: z.object({
      message: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateNotificationValidationSchema = z.object({
  body: z.object({
    Notification: z.object({
      message: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
