/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TPrivacy = {
  message: string;
  isDeleted: boolean;
};

export interface PrivacyModel extends Model<TPrivacy> {
  isPrivacyExists(id: string): Promise<TPrivacy | null>;
}
