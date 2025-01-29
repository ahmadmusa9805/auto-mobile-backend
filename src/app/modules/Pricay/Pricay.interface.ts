/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TPricay = {
  message: string;
  isDeleted: boolean;
};

export interface PricayModel extends Model<TPricay> {
  isPricayExists(id: string): Promise<TPricay | null>;
}
