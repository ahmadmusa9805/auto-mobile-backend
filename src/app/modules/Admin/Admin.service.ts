/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdminSearchableFields } from './Admin.constant';
import mongoose from 'mongoose';
import { TAdmin } from './Admin.interface';
import { Admin } from './Admin.model';

const createAdminIntoDB = async (
  payload: TAdmin,
) => {
  const result = await Admin.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
  }

  return result;
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(
    Admin.find(),
    query,
  )
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await AdminQuery.modelQuery;
  const meta = await AdminQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);

  return result;
};

const updateAdminIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('admins')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('Admin not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Admin');
  }

  const updatedData = await Admin.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Admin not found after update');
  }

  return updatedData;
};

const deleteAdminFromDB = async (id: string) => {
  const deletedService = await Admin.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
  }

  return deletedService;
};

export const AdminServices = {
  createAdminIntoDB,
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
