import express from 'express';
import { PricayControllers } from './Pricay.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPricayValidationSchema, updatePricayValidationSchema } from './Pricay.validation';

const router = express.Router();

router.post(
  '/create-pricay',
  validateRequest(createPricayValidationSchema),
  PricayControllers.createPricay,
);

router.get(
  '/:id',
  PricayControllers.getSinglePricay,
);

router.patch(
  '/:id',
  validateRequest(updatePricayValidationSchema),
  PricayControllers.updatePricay,
);

router.delete(
  '/:id',
  PricayControllers.deletePricay,
);

router.get(
  '/',
  PricayControllers.getAllPricays,
);

export const PricayRoutes = router;
