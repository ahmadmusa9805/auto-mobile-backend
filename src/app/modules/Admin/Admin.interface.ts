/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TAdmin = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(id: string): Promise<TAdmin | null>;
}
