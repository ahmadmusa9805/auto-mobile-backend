/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  passwordChangedAt?: Date;
  contactNo: string;
  profileImg?: string;
  otpVerified: boolean;
  role: 'client' | 'superAdmin' | 'admin';
  status?: 'active' | 'blocked';
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  // Static methods for checking if the user exists
    // isUserExistsByCustomEmail(email: string): Promise<TUser>;
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
