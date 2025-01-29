import { z } from 'zod';

export const createTicketValidationSchema = z.object({
  body: z.object({
    Ticket: z.object({
      jobId: z.string().min(1),
      status: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateTicketValidationSchema = z.object({
  body: z.object({
    Ticket: z.object({
      jobId: z.string().optional(),
      status: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
