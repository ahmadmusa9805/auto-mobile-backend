/* eslint-disable @typescript-eslint/no-explicit-any */
// 
// import express from 'express';
import express, { NextFunction, Response, Request } from 'express';
import { UserControllers } from './user.controller.ts';
import validateRequest from '../../middlewares/validateRequest.ts';
import { UserValidation } from './user.validation.ts';
import { USER_ROLE } from './user.constant.ts';
import auth from '../../middlewares/auth.ts';
import { uploadFileS3 } from '../../utils/UploaderS3.ts';

// import { upladFileS3 } from '..\..\utils\UploaderS3';

const router = express.Router();
router.post(
  '/create-client', //create client or technician
  validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createClient,
);
router.post(
  '/create-technician', //create client or technician
  validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createTechnician,
);
router.post(
  '/create-supervisor',
  // auth(USER_ROLE.client),
  validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createSuperVisor,
);
router.post(
  '/create-admin',
  // auth(USER_ROLE.superAdmin),
  validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createAdmin,
);
router.get(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client, USER_ROLE.supervisor, USER_ROLE.technician),
  UserControllers.getMe,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client, USER_ROLE.supervisor, USER_ROLE.technician),
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
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.get(
  '/users-monthly',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getUsersMonthly,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.deleteUser,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin),
  UserControllers.getAllUsers,
);
router.get(
  '/supervisors/:id',
  // auth(USER_ROLE.superAdmin),
  UserControllers.getAllSuperVisorsWithUserId,  
);

router.get(
  '/admins',
  auth(USER_ROLE.superAdmin),
  UserControllers.getAllAdmins,
);

router.get(
  '/clients',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllClients,
);
router.get(
  '/technicians',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllTechnicians,
);

router.get(
  '/supervisors',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getAllSuperVisors,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.client),
  UserControllers.getSingleUser,
);


export const UserRoutes = router;
