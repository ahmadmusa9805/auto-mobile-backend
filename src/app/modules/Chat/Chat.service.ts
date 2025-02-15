/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
// import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Chat } from './Chat.model';
import { TChat } from './Chat.interface';
// import { CHAT_SEARCHABLE_FIELDS } from './Chat.constant';
import { Types } from "mongoose";  // Make sure to import this


// Create a chat message
const createChatIntoDB = async (payload: Partial<TChat>) => {
  const result = await Chat.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Chat");
  }

  return result;
};
// Create a chat message
const uploadFiletoService = async (file: any) => {
  const fileUrl = `/uploads/${file.filename}`;;

  // if (!result) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Chat");
  // }

  return fileUrl;
};

// Get unread messages count
const getUnreadMessagesCountFromDB = async (receiverId: string) => {
  return await Chat.countDocuments({ receiver: receiverId, isRead: false });
};


// Fetch all chats with user details
// const getAllChatsFromDB = async (query: Record<string, unknown>) => {
//   const ChatQuery = new QueryBuilder(Chat.find(), query)
//     .search(CHAT_SEARCHABLE_FIELDS)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await ChatQuery.modelQuery;
//   const meta = await ChatQuery.countTotal();

//   // Populate sender and receiver details
//   await Chat.populate(result, { path: "sender receiver", select: "name image" });

//   return { result, meta };
// };

const getAllChatsFromDB = async (userId: string, chatId: string) => {
  return await Chat.find({
    $or: [
      { sender: userId, receiver: chatId },
      { receiver: userId, sender: chatId },
    ],
  })
  .sort({ createdAt: -1 }) // Sort by the most recent message
  .populate("sender receiver", "name image");  // Populate sender and receiver details
};


// Mark messages as read
// const markMessagesAsReadIntoDB = async (senderId: string, receiverId: string) => {
//   await Chat.updateMany({ sender: senderId, receiver: receiverId }, { isRead: true });
// };
const markMessagesAsReadIntoDB = async (senderId: string, receiverId: string) => {
  // console.log(`senderId: ${senderId}, receiverId: ${receiverId}`);
 await Chat.updateMany({ sender: senderId, receiver: receiverId, isRead: false }, { isRead: true });
  // console.log(`senderId: ${result}`);

  // if (result.modifiedCount === 0) {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'Failed to mark messages as read');
  // }

  // return result;
};



// const getRecentChatsFromDB = async (userId: string) => {
//   const userObjectId = new Types.ObjectId(userId);

//   return await Chat.aggregate([
//     {
//       $match: {
//         $or: [{ sender: userObjectId }, { receiver: userObjectId }],
//       },
//     },
//     {
//       $sort: { createdAt: -1 },
//     },
//     {
//       $group: {
//         _id: {
//           $cond: {
//             if: { $eq: ["$sender", userObjectId] },
//             then: "$receiver",
//             else: "$sender",
//           },
//         },
//         lastMessage: { $first: "$$ROOT" },
//         unreadCount: {
//           $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] },
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "users", // Assuming "users" is the collection name for users
//         localField: "_id",
//         foreignField: "_id",
//         as: "userDetails",
//       },
//     },
//     {
//       $project: {
//         lastMessage: 1,
//         userDetails: { $arrayElemAt: ["$userDetails", 0] },
//       },
//     },
//   ]);
// };



// const getRecentChatsFromDB = async (userId: string) => {
//   const userObjectId = new Types.ObjectId(userId);
  
//   return await Chat.aggregate([
//     {
//       $match: {
//         $or: [{ sender: userObjectId }, { receiver: userObjectId }],
//       },
//     },
//     {
//       $sort: { createdAt: -1 }, // Sort by most recent message
//     },
//     {
//       $group: {
//         _id: {
//           $cond: {
//             if: { $eq: ["$sender", userObjectId] },
//             then: "$receiver",
//             else: "$sender",
//           },
//         },
//         lastMessage: { $first: "$$ROOT" }, // Get the most recent message
//         unreadCount: {
//           $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] }, // Count unread messages
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "users", // Assuming the `users` collection contains the user details
//         localField: "_id",
//         foreignField: "_id",
//         as: "userDetails",
//       },
//     },
//     {
//       $project: {
//         lastMessage: 1,
//         userDetails: { $arrayElemAt: ["$userDetails", 0] }, // Extract user details (name, image)
//         unreadCount: 1, // Include unread count in the result
//       },
//     },
//   ]);
// };
const getRecentChatsFromDB = async (userId: string) => {
  const userObjectId = new Types.ObjectId(userId);

  return await Chat.aggregate([
    {
      $match: {
        $or: [{ sender: userObjectId }, { receiver: userObjectId }],
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by most recent message
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: ["$sender", userObjectId] },
            then: "$receiver",
            else: "$sender",
          },
        },
        lastMessage: { $first: "$$ROOT" }, // Get the most recent message
        unreadCount: {
          $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] }, // Count unread messages
        },
      },
    },
    {
      $lookup: {
        from: "users", // Assuming the `users` collection contains the user details
        localField: "_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $project: {
        lastMessage: 1,
        userDetails: { $arrayElemAt: ["$userDetails", 0] }, // Extract user details (name, image)
        unreadCount: 1, // Include unread count in the result
        lastMessageCreatedAt: "$lastMessage.createdAt", // Include last message's createdAt
      },
    },
  ]);
};


// Delete chat (soft delete)
const deleteChatFromDB = async (id: string) => {
  const deletedChat = await Chat.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

  if (!deletedChat) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Chat");
  }

  return deletedChat;
};
export const ChatServices = {
  getUnreadMessagesCountFromDB,
  markMessagesAsReadIntoDB,
  getRecentChatsFromDB,
  createChatIntoDB,
  getAllChatsFromDB,
  deleteChatFromDB,
  uploadFiletoService
};
////////
// const createChatIntoDB = async (
//   payload: Partial<TChat>,
// ) => {
//   const result = await Chat.create(payload);
  
//   if (!result) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Chat');
//   }

//   return result;
// };
// Create a chat message


// const deleteChatFromDB = async (id: string) => {
//   const deletedService = await Chat.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     { new: true },
//   );

//   if (!deletedService) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Chat');
//   }

//   return deletedService;
// };

// const getRecentChatsFromDB = async (userId: string) => {
//   return await Chat.aggregate([
//     { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
//     { $sort: { createdAt: -1 } },
//     {
//       $group: {
//         _id: "$receiver",
//         lastMessage: { $first: "$$ROOT" },
//       },
//     },
//     { $sort: { "lastMessage.createdAt": -1 } },
//   ]);
// };

// const markMessagesAsReadIntoDB = async (senderId: string, receiverId: string) => {
//   await Chat.updateMany({ sender: senderId, receiver: receiverId }, { isRead: true });
// };


// const getAllChatsFromDB = async (query: Record<string, unknown>) => {
//   const ChatQuery = new QueryBuilder(
//     Chat.find(),
//     query,
//   )
//     .search(CHAT_SEARCHABLE_FIELDS)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await ChatQuery.modelQuery;
//   const meta = await ChatQuery.countTotal();
//   return {
//     result,
//     meta,
//   };
// };

// const getUnreadMessagesCountFromDB = async (receiverId: string) => {
//   return await Chat.countDocuments({ receiver: receiverId, isRead: false });
// };
