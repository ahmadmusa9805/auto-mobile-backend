/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import mongoose from 'mongoose';
import { TInvoice } from './Invoice.interface';
import { Invoice } from './Invoice.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { INVOICE_SEARCHABLE_FIELDS } from './Invoice.constant';


const createInvoiceIntoDB = async (
  payload: TInvoice,
) => {
  const result = await Invoice.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Invoice');
  }

  return result;
};

const getAllInvoicesFromDB = async (query: Record<string, unknown>) => {
  const InvoiceQuery = new QueryBuilder(
    Invoice.find({ isDeleted: false }),
    query,
  )
    .search(INVOICE_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await InvoiceQuery.modelQuery;
  const meta = await InvoiceQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleInvoiceFromDB = async (id: string) => {
  const result = await Invoice.findOne({_id:id, isDeleted: false});
  return result;
};

const updateInvoiceIntoDB = async (id: string, payload: any) => {
  
  const isDeletedService = await mongoose.connection
    .collection('invoices')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      // { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService) {
    throw new Error('Invoice not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Invoice');
  }

  const updatedData = await Invoice.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Invoice not found after update');
  }

  return updatedData;
};

const deleteInvoiceFromDB = async (id: string) => {
  const deletedService = await Invoice.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Invoice');
  }

  return deletedService;
};

export const InvoiceServices = {
  createInvoiceIntoDB,
  getAllInvoicesFromDB,
  getSingleInvoiceFromDB,
  updateInvoiceIntoDB,
  deleteInvoiceFromDB,
};
