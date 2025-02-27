import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { NotificationServices } from './Notification.service';
import sendResponse from '../../utils/sendResponse';


const createNotification = catchAsync(async (req, res) => {
  const { Notification: NotificationData } = req.body;
  const result = await NotificationServices.createNotificationIntoDB(NotificationData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification is created successfully',
    data: result,
  });
});

const getSingleNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationServices.getSingleNotificationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification is retrieved successfully',
    data: result,
  });
});

const getAllNotifications = catchAsync(async (req, res) => {
  
  const result = await NotificationServices.getAllNotificationsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllNotificationsAssigned = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await NotificationServices.getAllNotificationsAssignedFromDB(id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllNotificationsRaised = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await NotificationServices.getAllNotificationsRaisedFromDB(id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllNotificationsAndReadAll = catchAsync(async (req, res) => {
  const result = await NotificationServices.getAllNotificationsAndReadAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Notification } = req.body;
  const result = await NotificationServices.updateNotificationIntoDB(id, Notification);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification is updated successfully',
    data: result,
  });
});

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationServices.deleteNotificationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification is deleted successfully',
    data: result,
  });
});

export const NotificationControllers = {
  createNotification,
  getSingleNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
  getAllNotificationsAndReadAll,
  getAllNotificationsAssigned,
  getAllNotificationsRaised
};
