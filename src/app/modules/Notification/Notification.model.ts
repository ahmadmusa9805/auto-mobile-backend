import { Schema, model } from 'mongoose';
      import { TNotification, NotificationModel } from './Notification.interface';
      
      const NotificationSchema = new Schema<TNotification, NotificationModel>({
        message: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      NotificationSchema.statics.isNotificationExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Notification = model<TNotification, NotificationModel>('Notification', NotificationSchema);
      