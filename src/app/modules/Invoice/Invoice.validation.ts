import { z } from 'zod';


export const createInvoiceValidationSchema = z.object({
  body: z.object({
    Invoice: z.object({
      jobId: z.string().min(1),
      clientAdminName: z.string().min(1), // Ensure at least one admin().optional(),
      services: z.object({
        serviceName: z.string().min(1, "Service name is required"),
        serviceCost: z.number().positive("Service cost must be a positive number"),
        quantity: z.number().int().positive("Quantity must be a positive integer"),
      }).array(),
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
