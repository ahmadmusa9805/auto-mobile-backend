import express from 'express';
import { ChatControllers } from './Chat.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createChatValidationSchema, updateChatValidationSchema } from './Chat.validation';

const router = express.Router();

router.post(
  '/create-Chat',
  validateRequest(createChatValidationSchema),
  ChatControllers.createChat,
);

router.get(
  '/:id',
  ChatControllers.getSingleChat,
);

router.patch(
  '/:id',
  validateRequest(updateChatValidationSchema),
  ChatControllers.updateChat,
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
