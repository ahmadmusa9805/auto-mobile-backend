import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ServiceServices } from './Service.service';
import sendResponse from '../../utils/sendResponse';


const createService = catchAsync(async (req, res) => {
  const { Service: ServiceData } = req.body;
  const result = await ServiceServices.createServiceIntoDB(ServiceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is created successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is retrieved successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Service } = req.body;
  const result = await ServiceServices.updateServiceIntoDB(id, Service);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is deleted successfully',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
