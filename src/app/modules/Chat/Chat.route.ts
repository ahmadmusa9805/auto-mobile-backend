import express from 'express';
import { ChatControllers } from './Chat.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createChatValidationSchema } from './Chat.validation';



const router = express.Router();

router.get("/chats/:id", ChatControllers.getRecentChats);
router.get("/unread/:id", ChatControllers.getUnreadMessagesCount);
router.post("/read", ChatControllers.markAsRead);

// router.get("/chats", async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const chats = await ChatServices.getRecentChatsFromDB(userId);
//     res.status(200).json({ success: true, data: chats });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching chats" });
//   }
// });


router.post(
  '/create-Chat',
  validateRequest(createChatValidationSchema),
  ChatControllers.createChat,
);

router.delete(
  '/:id',
  ChatControllers.deleteChat,
);

router.get(
  '/',
  ChatControllers.getAllChats,
);

export const ChatRoutes = router;
