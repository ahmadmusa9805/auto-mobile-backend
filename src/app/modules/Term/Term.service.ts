/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
// import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
// import { TERM_SEARCHABLE_FIELDS } from './Term.constant';
import mongoose from 'mongoose';
import { Term } from './Term.model';

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

// const getAllTermsFromDB = async (query: Record<string, unknown>) => {
//   const TermQuery = new QueryBuilder(
//     Term.find({ isDeleted: false }),
//     query,
//   )
//     .search(TERM_SEARCHABLE_FIELDS)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await TermQuery.modelQuery;
//   const meta = await TermQuery.countTotal();
//   return {
//     result,
//     meta,
//   };
// };

const getSingleTermFromDB = async () => {
  const result = await Term.findOne({ isDeleted: false});

  return result;
};

const updateTermIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('terms')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      // { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService) {
    throw new Error('Term not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Term');
  }

  const updatedData = await Term.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Term not found after update');
  }

  return updatedData;
};

// const deleteTermFromDB = async (id: string) => {
//   const deletedService = await Term.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     { new: true },
//   );

//   if (!deletedService) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Term');
//   }

//   return deletedService;
// };

export const TermServices = {
  createTermIntoDB,
  // getAllTermsFromDB,
  getSingleTermFromDB,
  updateTermIntoDB,
  // deleteTermFromDB,
};
