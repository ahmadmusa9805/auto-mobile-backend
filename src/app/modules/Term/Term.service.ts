/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Term } from './Term.model';
import AppError from '../../errors/AppError';

const createTermIntoDB = async (payload: any) => {
  // Check if a term already exists based on a unique field (e.g., term name or code)
  const existingTerm = await Term.find({ }); // or use another unique field like 'code'
  if (existingTerm[0]) {
    // If a term exists, update it with the new payload
    const updatedTerm = await Term.findByIdAndUpdate(existingTerm[0]._id, payload, { new: true });
    return updatedTerm;  // Return the updated term
  }

  // If the term doesn't exist, create a new one
  const result = await Term.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Term');
  }

  return result;  // Return the created term
};


const getSingleTermFromDB = async () => {
  const result = await Term.findOne({ isDeleted: false});

  return result;
};


export const TermServices = {
  createTermIntoDB,
  getSingleTermFromDB,
};
