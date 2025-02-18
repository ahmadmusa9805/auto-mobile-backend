/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.ts';
import { UserServices } from './user.service.ts';
import sendResponse from '../../utils/sendResponse.ts';


const createClient = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createClientIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client is created succesfully and OTP sent',
    data: result,
  });
});
const createTechnician = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createTechnicianIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technician is created succesfully and OTP sent',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createAdminIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully and OTP sent',
    data: result,
  });
});
const createSuperVisor = catchAsync(async (req, res) => {
  const { User: userData } = req.body;
  const result = await UserServices.createSuperVisorIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'supervisor is created succesfully and OTP sent',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userEmail } = req.user;

  const result = await UserServices.getMe(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.getSingleUserIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
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
const getAllSuperVisorsWithUserId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getAllSuperVisorsWithUserIdFromDB(id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperVisors are retrieved succesfully',
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

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { User } = req.body;

  const result = await UserServices.updateUserIntoDB(id, User, req.file);

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


const getAllTechnicians = catchAsync(async (req, res) => {
  const result = await UserServices.getAllTechniciansFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technicians are retrieved succesfully',
    data: result
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await UserServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllClients = catchAsync(async (req, res) => {
  const result = await UserServices.getAllClientsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clients are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllSuperVisors = catchAsync(async (req, res) => {
  const result = await UserServices.getAllSuperVisorsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperVisors are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});


export const UserControllers = {
  createClient,
  createTechnician,
  createAdmin,
  createSuperVisor,
  getSingleUser,
  getUsersMonthly,
  deleteUser,
  updateUser,
  getMe,
  changeStatus,
  getAllUsers,
  getAllTechnicians,
  getAllSuperVisors,
  getAllClients,
  getAllAdmins,
  getAllSuperVisorsWithUserId
};
