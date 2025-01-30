/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TChat } from './Chat.interface';
import { Chat } from './Chat.model';

const createChatIntoDB = async (
  payload: TChat,
) => {
  const result = await Chat.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Chat');
  }

  return result;
};

const getAllChatsFromDB = async (query: Record<string, unknown>) => {
  const ChatQuery = new QueryBuilder(
    Chat.find(),
    query,
  )
    .search(ChatSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ChatQuery.modelQuery;
  const meta = await ChatQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleChatFromDB = async (id: string) => {
  const result = await Chat.findById(id);

  return result;
};

const updateChatIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('chats')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('Chat not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Chat');
  }

  const updatedData = await Chat.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Chat not found after update');
  }

  return updatedData;
};

const deleteChatFromDB = async (id: string) => {
  const deletedService = await Chat.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Chat');
  }

  return deletedService;
};

export const ChatServices = {
  createChatIntoDB,
  getAllChatsFromDB,
  getSingleChatFromDB,
  updateChatIntoDB,
  deleteChatFromDB,
};
