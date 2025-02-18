import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.ts';
import { AdminServices } from './Admin.service.ts';
import sendResponse from '../../utils/sendResponse.ts';




const createAdmin = catchAsync(async (req, res) => {
  const { Admin: AdminData } = req.body;
  const result = await AdminServices.createAdminIntoDB(AdminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, Admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  createAdmin,
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
