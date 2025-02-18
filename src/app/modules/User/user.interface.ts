/* eslint-disable no-unused-vars */
import { Model , Types} from 'mongoose';
import { USER_ROLE } from './user.constant.ts';

export type  TUser = {
  fullName: string;
  userName?: string;
  creatorId: Types.ObjectId;
  technicianJobs?: number;
  email: string;
  location?: string;
  password: string;
  passwordChangedAt?: Date;
  contactNo: string;
  profileImg?: string;
  otpVerified: boolean;
  skills: string[];
  adminClientEmail?: string;
  dob?: string;
  role: 'client' | 'superAdmin' | 'admin' | 'supervisor' | 'technician';
  status?: 'active' | 'blocked';
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  // Static methods for checking if the user exists
  isUserExistsByCustomEmail(email: string): Promise<TUser | null>;

  // Static method for password comparison
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  // Static method to check JWT issuance timing
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
