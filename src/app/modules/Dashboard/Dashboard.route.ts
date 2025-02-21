import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createDashboardValidationSchema, updateDashboardValidationSchema } from './Dashboard.validation';
import { DashboardControllers } from './Dashboard.controller';


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
  '/job-growth-monthly',
  DashboardControllers.jobGrowthMonthly,
);
router.get(
  '/job-completed-monthly',
  DashboardControllers.getAlljobCompletedMonthly,
);

router.get(
  '/dashboard-reports',
  DashboardControllers.getAllDashboardReports,
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



export const DashboardRoutes = router;
