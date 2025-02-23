import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createPrivacyValidationSchema } from './Privacy.validation';
import { PrivacyControllers } from './Privacy.controller';


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
