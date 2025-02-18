import { Schema, model } from 'mongoose';
import { NotificationModel, TNotification } from './Notification.interface.ts';
      
      const NotificationSchema = new Schema<TNotification, NotificationModel>({
        message: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
        isRead: { type: Boolean, default: false },
        status: { type: String, enum: ['created', 'assigned', 'raised'], required: true },
        isDeleted: { type: Boolean, default: false },
      },{
        timestamps: true,
      });
      
NotificationSchema.statics.isNotificationExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
};
      
export const Notification = model<TNotification, NotificationModel>('Notification', NotificationSchema);
      