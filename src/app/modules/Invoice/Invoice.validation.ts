import { z } from 'zod';


export const createInvoiceValidationSchema = z.object({
  body: z.object({
    Invoice: z.object({
      jobId: z.string().min(1),
      clientAdminName: z.string().optional(),
      serviceName: z.string().min(1),
      servicePrice: z.string().min(1),
      paymentStatus: z.string().min(1),
      totalCost: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateInvoiceValidationSchema = z.object({
  body: z.object({
    Invoice: z.object({
      jobId: z.string().optional(),
      clientAdminName: z.string().optional(),
      serviceName: z.string().optional(),
      servicePrice: z.string().optional(),
      paymentStatus: z.string().optional(),
      totalCost: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
