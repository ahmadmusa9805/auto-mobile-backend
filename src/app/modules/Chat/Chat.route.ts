import express from 'express';
import { ChatControllers } from './Chat.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createChatValidationSchema } from './Chat.validation';



const router = express.Router();

router.get("/recent/:id", ChatControllers.getRecentChats);
router.get("/unread/:id", ChatControllers.getUnreadMessagesCount);
router.post("/read", ChatControllers.markAsRead);


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
