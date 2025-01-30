import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChatServices } from './Chat.service';

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

const getSingleChat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ChatServices.getSingleChatFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat is retrieved successfully',
    data: result,
  });
});

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

const updateChat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Chat } = req.body;
  const result = await ChatServices.updateChatIntoDB(id, Chat);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat is updated successfully',
    data: result,
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
  getSingleChat,
  getAllChats,
  updateChat,
  deleteChat,
};
