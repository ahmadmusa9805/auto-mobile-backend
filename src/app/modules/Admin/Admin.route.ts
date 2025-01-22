import express from 'express';
import { AdminControllers } from './Admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema, updateAdminValidationSchema } from './Admin.validation';

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
