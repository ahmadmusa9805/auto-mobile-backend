import express from 'express';
import validateRequest from '../../middlewares/validateRequest.ts';
import { AuthValidation } from './auth.validation.ts';
import { AuthControllers } from './auth.controller.ts';
import { USER_ROLE } from '../User/user.constant.ts';
import auth from '../../middlewares/auth.ts';


const router = express.Router();


router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client, USER_ROLE.technician, USER_ROLE.supervisor),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client, USER_ROLE.technician, USER_ROLE.supervisor),
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
