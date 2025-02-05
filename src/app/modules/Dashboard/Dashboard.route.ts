import express from 'express';
import { DashboardControllers } from './Dashboard.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createDashboardValidationSchema, updateDashboardValidationSchema } from './Dashboard.validation';

const router = express.Router();

router.post(
  '/create-Dashboard',
  validateRequest(createDashboardValidationSchema),
  DashboardControllers.createDashboard,
);
router.get(
  '/user-growth-monthly',
  DashboardControllers.userGrowthMonthly,
);

router.get(
  '/:id',
  DashboardControllers.getSingleDashboard,
);


router.patch(
  '/:id',
  validateRequest(updateDashboardValidationSchema),
  DashboardControllers.updateDashboard,
);

router.delete(
  '/:id',
  DashboardControllers.deleteDashboard,
);

router.get(
  '/',
  DashboardControllers.getAllDashboards,
);

export const DashboardRoutes = router;
