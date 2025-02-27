import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema, updateAdminValidationSchema } from './Admin.validation';
import { AdminControllers } from './Admin.controller';


const router = express.Router();

router.post(
  '/create-Admin',
  validateRequest(createAdminValidationSchema),
  AdminControllers.createAdmin,
);

router.get(
  '/:id',
  AdminControllers.getSingleAdmin,
);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  '/:id',
  AdminControllers.deleteAdmin,
);

router.get(
  '/',
  AdminControllers.getAllAdmins,
);

export const AdminRoutes = router;
