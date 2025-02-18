import express from 'express';
import validateRequest from '../../middlewares/validateRequest.ts';
import { createTicketValidationSchema, updateTicketValidationSchema } from './Ticket.validation.ts';
import { TicketControllers } from './Ticket.controller.ts';


const router = express.Router();

router.post(
 '/create-Ticket',
  validateRequest(createTicketValidationSchema),
  TicketControllers.createTicket,
);

router.get(
  '/:id',
  TicketControllers.getSingleTicket,
);

router.patch(
  '/:id',
  validateRequest(updateTicketValidationSchema),
  TicketControllers.updateTicket,
);

router.delete(
  '/:id',
  TicketControllers.deleteTicket,
);

router.get(
  '/',
  TicketControllers.getAllTickets,
);

export const TicketRoutes = router;
