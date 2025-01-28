/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TJob = {
  regName: string;
  make: string;
  model: string;
  engine: string;
  power: string;
  gearBox: string;
  services: string[];
  status: 'cancelled' | 'pending' | 'completed';
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


// job.model.ts

