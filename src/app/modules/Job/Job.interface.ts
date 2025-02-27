/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TJob = {
  regName: string;
  userId: Types.ObjectId;
  grandId?: Types.ObjectId;
  jobId: string
  raisedId?: Types.ObjectId;
  make: string;
  model: string;
  engine: string;
  power: string;
  invoiceRequest: boolean;
  gearBox: string;
  services: string[];
  status: 'cancelled' | 'pending' | 'completed' | 'raised';
  paymentStatus: 'cancelled' | 'pending' | 'completed';
  additionalInfo?: string;
  assignedTechnician?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export interface JobModel extends Model<TJob> {
  isJobExists(id: string): Promise<TJob | null>;
}



