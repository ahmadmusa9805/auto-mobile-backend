import express from 'express';
import { ServiceControllers } from './Service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createServiceValidationSchema, updateServiceValidationSchema } from './Service.validation';

const router = express.Router();

router.post(
  '/create-Service',
  validateRequest(createServiceValidationSchema),
  ServiceControllers.createService,
);

router.get(
  '/:id',
  ServiceControllers.getSingleService,
);

router.patch(
  '/:id',
  validateRequest(updateServiceValidationSchema),
  ServiceControllers.updateService,
);

router.delete(
  '/:id',
  ServiceControllers.deleteService,
);

router.get(
  '/',
  ServiceControllers.getAllServices,
);

export const ServiceRoutes = router;
