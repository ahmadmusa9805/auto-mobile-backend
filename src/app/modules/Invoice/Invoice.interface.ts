/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TInvoice = {
  jobId: Types.ObjectId;
  clientAdminName: string;
  services: {
    serviceName: string;
    serviceCost: number;
  }[];
  paymentStatus: string;
  totalCost: string;
  isDeleted: boolean;
};

export interface InvoiceModel extends Model<TInvoice> {
  isInvoiceExists(id: string): Promise<TInvoice | null>;
}
