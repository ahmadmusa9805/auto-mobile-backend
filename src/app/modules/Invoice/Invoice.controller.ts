import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { InvoiceServices } from './Invoice.service';
import sendResponse from '../../utils/sendResponse';


const createInvoice = catchAsync(async (req, res) => {
  const { Invoice: InvoiceData } = req.body;
  const result = await InvoiceServices.createInvoiceIntoDB(InvoiceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice is created successfully',
    data: result,
  });
});

const getSingleInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.getSingleInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice is retrieved successfully',
    data: result,
  });
});

const getAllInvoices = catchAsync(async (req, res) => {
  const result = await InvoiceServices.getAllInvoicesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoices are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Invoice } = req.body;
  const result = await InvoiceServices.updateInvoiceIntoDB(id, Invoice);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice is updated successfully',
    data: result,
  });
});

const deleteInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.deleteInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice is deleted successfully',
    data: result,
  });
});

export const InvoiceControllers = {
  createInvoice,
  getSingleInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
};
