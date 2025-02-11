import { Schema, model } from 'mongoose';
      import { TNotification, NotificationModel } from './Notification.interface';
      
      const NotificationSchema = new Schema<TNotification, NotificationModel>({
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
      },{
        timestamps: true,
      });
      
NotificationSchema.statics.isNotificationExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
};
      
export const Notification = model<TNotification, NotificationModel>('Notification', NotificationSchema);
      