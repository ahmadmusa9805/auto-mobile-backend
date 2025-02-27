import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createTicketValidationSchema, updateTicketValidationSchema } from './Ticket.validation';
import { TicketControllers } from './Ticket.controller';


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
