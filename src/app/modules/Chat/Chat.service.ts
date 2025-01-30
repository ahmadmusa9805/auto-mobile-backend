/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Chat } from './Chat.model';
import { TChat } from './Chat.interface';
import { CHAT_SEARCHABLE_FIELDS } from './Chat.constant';


const createChatIntoDB = async (
  payload: Partial<TChat>,
) => {
  const result = await Chat.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Chat');
  }

  return result;
};

const getUnreadMessagesCountFromDB = async (receiverId: string) => {
  return await Chat.countDocuments({ receiver: receiverId, isRead: false });
};

const getAllChatsFromDB = async (query: Record<string, unknown>) => {
  const ChatQuery = new QueryBuilder(
    Chat.find(),
    query,
  )
    .search(CHAT_SEARCHABLE_FIELDS)
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


const markMessagesAsReadIntoDB = async (senderId: string, receiverId: string) => {
  await Chat.updateMany({ sender: senderId, receiver: receiverId }, { isRead: true });
};

const getRecentChatsFromDB = async (userId: string) => {
  return await Chat.aggregate([
    { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$receiver",
        lastMessage: { $first: "$$ROOT" },
      },
    },
    { $sort: { "lastMessage.createdAt": -1 } },
  ]);
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
  getUnreadMessagesCountFromDB,
  markMessagesAsReadIntoDB,
  getRecentChatsFromDB,
  createChatIntoDB,
  getAllChatsFromDB,
  deleteChatFromDB,
};
