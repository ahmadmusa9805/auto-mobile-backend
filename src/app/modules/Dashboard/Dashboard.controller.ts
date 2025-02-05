import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DashboardServices } from './Dashboard.service';

const createDashboard = catchAsync(async (req, res) => {
  const { Dashboard: DashboardData } = req.body;
  const result = await DashboardServices.createDashboardIntoDB(DashboardData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard is created successfully',
    data: result,
  });
});

const getSingleDashboard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DashboardServices.getSingleDashboardFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard is retrieved successfully',
    data: result,
  });
});

const userGrowthMonthly = catchAsync(async (req, res) => {
  const result = await DashboardServices.userGrowthMonthlyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Growth are retrieved successfully',
    data: result,
  });
});
const jobGrowthMonthly = catchAsync(async (req, res) => {
  const result = await DashboardServices.jobGrowthMonthlyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job Growth are retrieved successfully',
    data: result,
  });
});
const getAlljobCompletedMonthly = catchAsync(async (req, res) => {
  const result = await DashboardServices.getAlljobCompletedMonthlyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Completed Job are retrieved successfully',
    data: result,
  });
});

const getAllDashboards = catchAsync(async (req, res) => {
  const result = await DashboardServices.getAllDashboardsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboards are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateDashboard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Dashboard } = req.body;
  const result = await DashboardServices.updateDashboardIntoDB(id, Dashboard);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard is updated successfully',
    data: result,
  });
});

const deleteDashboard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DashboardServices.deleteDashboardFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard is deleted successfully',
    data: result,
  });
});

export const DashboardControllers = {
  createDashboard,
  getSingleDashboard,
  getAllDashboards,
  updateDashboard,
  deleteDashboard,
  userGrowthMonthly,
  jobGrowthMonthly,
  getAlljobCompletedMonthly
};
