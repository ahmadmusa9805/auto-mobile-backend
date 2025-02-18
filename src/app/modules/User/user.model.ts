/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface.ts';
import { UserStatus } from './user.constant.ts';
import config from '../../config/index.ts';

const userSchema = new Schema<TUser, UserModel>(
  {
    fullName: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    contactNo: {
      type: String,
      required: true,
    },
    userName: { type: String},
    technicianJobs: { type: Number},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: { type: String },
    password: {
      type: String,
      required: true,
      select: false, // Prevent password from being returned in queries
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['client', 'superAdmin', 'admin', 'supervisor', 'technician'],
      default: 'client',
    },
    dob: { type: String },
    profileImg : {
      type: String,
      default: '',
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: 'active',
    },
    skills: {
      type: [String],
      default: [],
    },
    adminClientEmail: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);