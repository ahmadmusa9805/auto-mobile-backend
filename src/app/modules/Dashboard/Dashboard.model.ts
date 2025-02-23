import { Schema, model } from 'mongoose';
import { DashboardModel, TDashboard } from './Dashboard.interface';
      
      const DashboardSchema = new Schema<TDashboard, DashboardModel>({
        name: { type: String, required: true },
        description: { type: String },
        atcCodes: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      DashboardSchema.statics.isDashboardExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Dashboard = model<TDashboard, DashboardModel>('Dashboard', DashboardSchema);
      