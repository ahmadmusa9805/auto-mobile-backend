import express from 'express';
import validateRequest from '../../middlewares/validateRequest.ts';
import { createServiceValidationSchema, updateServiceValidationSchema } from './Service.validation.ts';
import { ServiceControllers } from './Service.controller.ts';


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
