import { z } from 'zod';

export const createJobValidationSchema = z.object({
  body: z.object({
    Job: z.object({
      regName: z.string().min(1),
      userId: z.string().min(1),
      raisedId: z.string().min(1).optional(), 
      make: z.string().min(1),
      model: z.string().min(1),
      engine: z.string().min(1),
      power: z.string().min(1),
      gearBox: z.string().min(1),
      services: z.array(z.string()).min(1), // Ensure at least one service
      paymentStatus: z.string().min(1),
      additionalInfo: z.string().optional(),
      assignedTechnician: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateJobValidationSchema = z.object({
  body: z.object({
    Job: z.object({
      regName: z.string().optional(),
      userId: z.string().min(1).optional(),
      make: z.string().optional(),
      model: z.string().optional(),
      engine: z.string().optional(),
      power: z.string().optional(),
      gearBox: z.string().optional(),
      services: z.array(z.string()).optional(),
      status: z.string().optional(),
      paymentStatus: z.string().optional(),
      additionalInfo: z.string().optional(),
      assignedTechnician: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
// job.validation.ts
