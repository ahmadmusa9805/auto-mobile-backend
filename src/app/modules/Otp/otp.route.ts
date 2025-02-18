import express from 'express';
import { OtpControllers } from './otp.controller.ts';

const router = express.Router();

router.post(
  '/verify',
  OtpControllers.otpVeryfy,
);
router.post(
  '/verify-forget-password',
  OtpControllers.otpVeryfyForgetPassword,
);
router.post(
  '/generate-otp',
  OtpControllers.generateOtp,
);

// router.patch(
//   '/:id',
//   auth( USER_ROLE.admin, USER_ROLE.farmacy),
//   validateRequest(updateFarmacyValidationSchema),
//   FarmacyControllers.updateFarmacy,
// );

// router.delete(
//   '/:id',
//   auth( USER_ROLE.admin),
//   FarmacyControllers.deleteFarmacy,
// );

// router.get(
//   '/',
//   auth( USER_ROLE.admin),
//   FarmacyControllers.getAllFarmacies,
// );

export const OtpRoutes = router;
