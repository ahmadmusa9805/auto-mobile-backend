/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TNotification = {
  message: string;
  jobId: string;
  userId: string;
  isRead: boolean;
  isDeleted: boolean;
};

export interface NotificationModel extends Model<TNotification> {
  isNotificationExists(id: string): Promise<TNotification | null>;
}
