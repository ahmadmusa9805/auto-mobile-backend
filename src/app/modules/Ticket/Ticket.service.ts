/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TTicket } from './Ticket.interface';
import { Ticket } from './Ticket.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TICKET_SEARCHABLE_FIELDS } from './Ticket.constant';


const createTicketIntoDB = async (
  payload: TTicket,
) => {
  const result = await Ticket.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Ticket');
  }

  return result;
};

const getAllTicketsFromDB = async (query: Record<string, unknown>) => {
  const TicketQuery = new QueryBuilder(
    Ticket.find({ isDeleted: false }),
    query,
  )
    .search(TICKET_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await TicketQuery.modelQuery;
  const meta = await TicketQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleTicketFromDB = async (id: string) => {
  const result = await Ticket.findById(id,{isDeleted: false});

  return result;
};

const updateTicketIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('tickets')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
    );

  if (!isDeletedService) {
    throw new Error('Ticket not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Ticket');
  }

  const updatedData = await Ticket.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Ticket not found after update');
  }

  return updatedData;
};

const deleteTicketFromDB = async (id: string) => {
  const deletedService = await Ticket.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Ticket');
  }

  return deletedService;
};

export const TicketServices = {
  createTicketIntoDB,
  getAllTicketsFromDB,
  getSingleTicketFromDB,
  updateTicketIntoDB,
  deleteTicketFromDB,
};
