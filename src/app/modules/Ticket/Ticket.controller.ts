import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TicketServices } from './Ticket.service';
import sendResponse from '../../utils/sendResponse';


const createTicket = catchAsync(async (req, res) => {
  const { Ticket: TicketData } = req.body;
  const result = await TicketServices.createTicketIntoDB(TicketData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is created successfully',
    data: result,
  });
});

const getSingleTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TicketServices.getSingleTicketFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is retrieved successfully',
    data: result,
  });
});

const getAllTickets = catchAsync(async (req, res) => {
  const result = await TicketServices.getAllTicketsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tickets are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Ticket } = req.body;
  const result = await TicketServices.updateTicketIntoDB(id, Ticket);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is updated successfully',
    data: result,
  });
});

const deleteTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TicketServices.deleteTicketFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is deleted successfully',
    data: result,
  });
});

export const TicketControllers = {
  createTicket,
  getSingleTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
};
