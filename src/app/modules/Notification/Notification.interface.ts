/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TNotification = {
  message: string;
  jobId: Types.ObjectId;
  userId?: Types.ObjectId;
  isRead: boolean;
  status: 'created' | 'assigned' | 'raised';	
  isDeleted: boolean;
};

export interface NotificationModel extends Model<TNotification> {
  isNotificationExists(id: string): Promise<TNotification | null>;
}
