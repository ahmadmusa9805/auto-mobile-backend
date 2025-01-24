/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
// import sendImageToCloudinary from '../../utils/cloudinary';

const createClient = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createClientIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client is created succesfully',
    data: result,
  });
});
const createTechnician = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createTechnicianIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technician is created succesfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createAdminIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const createSuperVisor = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createSuperVisorIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'supervisor is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  // const { userEmail, role } = req.user;

  const result = await UserServices.getMe(userEmail);
  // const result = await UserServices.getMe(userEmail, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  // const { userEmail, role } = req.user;

  const result = await UserServices.getSingleUserIntoDB(id);
  // const result = await UserServices.getMe(userEmail, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getAllAdminUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllAdminUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getUsersMonthly = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersMonthlyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const result = await UserServices.updateUserIntoDB(id, user, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: req.file ? 'User data and profile image updated successfully' : 'User data updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted successfully',
    data: result,
  });
});

export const UserControllers = {
  createClient,
  createTechnician,
  createAdmin,
  getAllAdminUsers,
  createSuperVisor,
  getSingleUser,
  getUsersMonthly,
  deleteUser,
  updateUser,
  getMe,
  changeStatus,
  getAllUsers
};
