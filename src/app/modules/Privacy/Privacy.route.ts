import express from 'express';
import validateRequest from '../../middlewares/validateRequest.ts';
import { createPrivacyValidationSchema } from './Privacy.validation.ts';
import { PrivacyControllers } from './Privacy.controller.ts';


const router = express.Router();

router.post(
  '/create-Privacy',
  validateRequest(createPrivacyValidationSchema),
  PrivacyControllers.createPrivacy,
);


router.get(
  '/',
  PrivacyControllers.getSinglePrivacy,
);
export const PrivacyRoutes = router;
