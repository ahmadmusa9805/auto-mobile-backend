/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TService = {
  name: string;
  isDeleted: boolean;
};

export interface ServiceModel extends Model<TService> {
  isServiceExists(id: string): Promise<TService | null>;
}
