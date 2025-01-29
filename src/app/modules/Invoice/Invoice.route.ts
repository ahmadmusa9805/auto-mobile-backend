import express from 'express';
import { InvoiceControllers } from './Invoice.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createInvoiceValidationSchema, updateInvoiceValidationSchema } from './Invoice.validation';

const router = express.Router();

router.post(
  '/create-invoice',
  validateRequest(createInvoiceValidationSchema),
  InvoiceControllers.createInvoice,
);

router.get(
  '/:id',
  InvoiceControllers.getSingleInvoice,
);

router.patch(
  '/:id',
  validateRequest(updateInvoiceValidationSchema),
  InvoiceControllers.updateInvoice,
);

router.delete(
  '/:id',
  InvoiceControllers.deleteInvoice,
);

router.get(
  '/',
  InvoiceControllers.getAllInvoices,
);

export const InvoiceRoutes = router;
