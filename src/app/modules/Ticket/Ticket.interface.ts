/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TTicket = {
  jobId: Types.ObjectId;
  status?: string;
  isDeleted: boolean;
};

export interface TicketModel extends Model<TTicket> {
  isTicketExists(id: string): Promise<TTicket | null>;
}
