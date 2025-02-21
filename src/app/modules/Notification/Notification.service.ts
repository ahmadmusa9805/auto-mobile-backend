/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TNotification } from './Notification.interface';
import { Notification } from './Notification.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { NOTIFICATION_SEARCHABLE_FIELDS } from './Notification.constant';

const createNotificationIntoDB = async (
  payload: TNotification,
) => {

  const result = await Notification.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Notification');
  }

  return result;
};

const getAllNotificationsFromDB = async (query: Record<string, unknown>) => {
  const NotificationQuery = new QueryBuilder(
    Notification.find({ status: 'created', isDeleted: false }),
    // Notification.find({ status: 'created', isDeleted: false }),
    query,
  )
    .search(NOTIFICATION_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await NotificationQuery.modelQuery;
  const meta = await NotificationQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getAllNotificationsAssignedFromDB = async (id: string,query: Record<string, unknown>) => {
  const NotificationQuery = new QueryBuilder(
    Notification.find({userId: id, status: 'assigned', isDeleted: false }),
    query,
  )
    .search(NOTIFICATION_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await NotificationQuery.modelQuery;
  const meta = await NotificationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAllNotificationsRaisedFromDB = async (id: string,query: Record<string, unknown>) => {
  const NotificationQuery = new QueryBuilder(
    Notification.find({userId: id, status: 'raised', isDeleted: false }),
    query,
  )
    .search(NOTIFICATION_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await NotificationQuery.modelQuery;
  const meta = await NotificationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAllNotificationsAndReadAllFromDB = async (query: Record<string, unknown>) => {
  const NotificationQuery = new QueryBuilder(
    Notification.find({ isDeleted: false }),
    query,
  )
    .search(NOTIFICATION_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await NotificationQuery.modelQuery;
  const meta = await NotificationQuery.countTotal();

  
  // Update all notifications to mark them as read
  await Notification.updateMany(
    { isDeleted: false }, // Filter condition
    { $set: { isRead: true } } // Update operation
  );

  return {
    result,
    meta,
  };
};

const getSingleNotificationFromDB = async (id: string) => {
  const result = await Notification.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isRead: true } },
    { new: true }
  );
  return result;
};

const updateNotificationIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('notifications')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
    );

  if (!isDeletedService) {
    throw new Error('Notification not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Notification');
  }

  const updatedData = await Notification.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Notification not found after update');
  }

  return updatedData;
};

const deleteNotificationFromDB = async (id: string) => {
  const deletedService = await Notification.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Notification');
  }

  return deletedService;
};

export const NotificationServices = {
  createNotificationIntoDB,
  getAllNotificationsFromDB,
  getSingleNotificationFromDB,
  updateNotificationIntoDB,
  deleteNotificationFromDB,
  getAllNotificationsAndReadAllFromDB,
  getAllNotificationsAssignedFromDB,
  getAllNotificationsRaisedFromDB
};
