/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChatServices } from './Chat.service';
import { Request, Response } from 'express';

const createChat = catchAsync(async (req, res) => {
  const { Chat: ChatData } = req.body;
  const result = await ChatServices.createChatIntoDB(ChatData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat is created successfully',
    data: result,
  });
});

const getUnreadMessagesCount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const count = await ChatServices.getUnreadMessagesCountFromDB(id);


  // res.json({ unreadMessages: count });

  sendResponse(res as any, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chats are retrieved successfully',
    data: count,
  });
};

const markAsRead = async (req: Request, res: Response) => {
  const { sender, receiver } = req.body;
  const result = await ChatServices.markMessagesAsReadIntoDB(sender, receiver);


  sendResponse(res as any, {
    statusCode: httpStatus.OK,
    success: true,
    message: '"Messages marked as read"',
    data: result,
  });
};

const getRecentChats = async (req: Request, res: Response) => {
  const { id } = req.params;
  const chats = await ChatServices.getRecentChatsFromDB(id);

  sendResponse(res as any, {
    statusCode: httpStatus.OK,
    success: true,
    message: '"Messages marked as read"',
    data: chats,
  });
};

const getAllChats = catchAsync(async (req, res) => {
  const result = await ChatServices.getAllChatsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chats are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});


const deleteChat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ChatServices.deleteChatFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat is deleted successfully',
    data: result,
  });
});

export const ChatControllers = {
  createChat,
  getAllChats,
  deleteChat,
  markAsRead,
  getUnreadMessagesCount,
  getRecentChats
};
