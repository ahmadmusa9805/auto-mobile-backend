/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TPrivacy } from './Privacy.interface';
import { Privacy } from './Privacy.model';
import AppError from '../../errors/AppError';


const createPrivacyIntoDB = async (
  payload: TPrivacy,
) => {
  // Check if a term already exists based on a unique field (e.g., term name or code)
  const existingPrivacy = await Privacy.find({ }); // or use another unique field like 'code'
  if (existingPrivacy[0]) {
    // If a term exists, update it with the new payload
    const updatedPolicy = await Privacy.findByIdAndUpdate(existingPrivacy[0]._id, payload, { new: true });
    return updatedPolicy;  // Return the updated term
  }

  // If the term doesn't exist, create a new one
  const result = await Privacy.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Term');
  }
  return result;  // Return the created term
};



const getSinglePrivacyFromDB = async () => {
  const result = await Privacy.findOne({ isDeleted: false});
  return result;
};

export const PrivacyServices = {
  createPrivacyIntoDB,
  getSinglePrivacyFromDB,
};
