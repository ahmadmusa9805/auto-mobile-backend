import express from 'express';
import { PrivacyControllers } from './Privacy.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPrivacyValidationSchema, updatePrivacyValidationSchema } from './Privacy.validation';

const router = express.Router();

router.post(
  '/create-Privacy',
  validateRequest(createPrivacyValidationSchema),
  PrivacyControllers.createPrivacy,
);

router.get(
  '/:id',
  PrivacyControllers.getSinglePrivacy,
);

router.patch(
  '/:id',
  validateRequest(updatePrivacyValidationSchema),
  PrivacyControllers.updatePrivacy,
);

// router.delete(
//   '/:id',
//   PrivacyControllers.deletePrivacy,
// );

// router.get(
//   '/',
//   PrivacyControllers.getAllPrivacys,
// );

export const PrivacyRoutes = router;
