import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PricayServices } from './Pricay.service';

const createPricay = catchAsync(async (req, res) => {
  const { Pricay: PricayData } = req.body;
  const result = await PricayServices.createPricayIntoDB(PricayData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricay is created successfully',
    data: result,
  });
});

const getSinglePricay = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricayServices.getSinglePricayFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricay is retrieved successfully',
    data: result,
  });
});

const getAllPricays = catchAsync(async (req, res) => {
  const result = await PricayServices.getAllPricaysFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricays are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updatePricay = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Pricay } = req.body;
  const result = await PricayServices.updatePricayIntoDB(id, Pricay);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricay is updated successfully',
    data: result,
  });
});

const deletePricay = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricayServices.deletePricayFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricay is deleted successfully',
    data: result,
  });
});

export const PricayControllers = {
  createPricay,
  getSinglePricay,
  getAllPricays,
  updatePricay,
  deletePricay,
};
