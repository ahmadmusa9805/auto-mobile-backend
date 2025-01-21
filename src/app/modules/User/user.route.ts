/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { NextFunction, Response, Request } from 'express';
import auth from '../../middlewares/auth';
// import { createActorValidationSchema } from '../Client/actor.validation';
// import { createAdminValidationSchema } from '../Admin/admin.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { uploadFileS3 } from '../../utils/UploaderS3';

const router = express.Router();
// router.post(
//   '/create-actor',
//   validateRequest(createActorValidationSchema),
//   UserControllers.createActor,
// );


router.post(
  '/create-user',
  // auth(USER_ROLE.superAdmin),
  validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createUser,
);

router.get(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getMe,
);

router.get(
  '/admin',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getAllAdminUsers,
);

router.get(
  '/users-monthly',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getUsersMonthly,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getSingleUser,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getAllUsers,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.deleteUser,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  uploadFileS3(true).single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (error) {
        next(error);
      }
    }
    next();
  },
  UserControllers.updateUser,
);

export const UserRoutes = router;
