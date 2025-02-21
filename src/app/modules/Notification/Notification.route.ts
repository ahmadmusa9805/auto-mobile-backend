import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createNotificationValidationSchema, updateNotificationValidationSchema } from './Notification.validation';
import { NotificationControllers } from './Notification.controller';


const router = express.Router();

router.post(
  '/create-Notification',
  validateRequest(createNotificationValidationSchema),
  NotificationControllers.createNotification,
);

router.get(
  '/read-all',
  NotificationControllers.getAllNotificationsAndReadAll,
);
router.get(
  '/assigned/:id',
  NotificationControllers.getAllNotificationsAssigned,
);

router.get(
  '/raised/:id',
  NotificationControllers.getAllNotificationsRaised,
);
router.get(
  '/:id',
  NotificationControllers.getSingleNotification,
);

router.patch(
  '/:id',
  validateRequest(updateNotificationValidationSchema),
  NotificationControllers.updateNotification,
);

router.delete(
  '/:id',
  NotificationControllers.deleteNotification,
);

router.get(
  '/',
  NotificationControllers.getAllNotifications,
);

router.get(
  '/read-all',
  NotificationControllers.getAllNotifications,
);

export const NotificationRoutes = router;
