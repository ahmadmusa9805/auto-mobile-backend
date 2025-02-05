import { Model } from 'mongoose';

export type TDashboard = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface DashboardModel extends Model<TDashboard> {
  isDashboardExists(id: string): Promise<TDashboard | null>;
}
