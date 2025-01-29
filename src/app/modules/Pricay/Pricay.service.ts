/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PRICAY_SEARCHABLE_FIELDS } from './Pricay.constant';
import mongoose from 'mongoose';
import { TPricay } from './Pricay.interface';
import { Pricay } from './Pricay.model';

const createPricayIntoDB = async (
  payload: TPricay,
) => {
  const result = await Pricay.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Pricay');
  }

  return result;
};

const getAllPricaysFromDB = async (query: Record<string, unknown>) => {
  const PricayQuery = new QueryBuilder(
    Pricay.find({ isDeleted: false }),
    query,
  )
    .search(PRICAY_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await PricayQuery.modelQuery;
  const meta = await PricayQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSinglePricayFromDB = async (id: string) => {
  const result = await Pricay.findById({id, isDeleted: false});

  return result;
};

const updatePricayIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('pricays')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('Pricay not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Pricay');
  }

  const updatedData = await Pricay.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Pricay not found after update');
  }

  return updatedData;
};

const deletePricayFromDB = async (id: string) => {
  const deletedService = await Pricay.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Pricay');
  }

  return deletedService;
};

export const PricayServices = {
  createPricayIntoDB,
  getAllPricaysFromDB,
  getSinglePricayFromDB,
  updatePricayIntoDB,
  deletePricayFromDB,
};
