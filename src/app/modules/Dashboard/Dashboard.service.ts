/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { DASHBOARD_SEARCHABLE_FIELDS, monthNamesShortForm } from './Dashboard.constant';
import mongoose from 'mongoose';
import { TDashboard } from './Dashboard.interface';
import { Dashboard } from './Dashboard.model';
import { User } from '../User/user.model';

const createDashboardIntoDB = async (
  payload: TDashboard,
) => {
  const result = await Dashboard.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Dashboard');
  }

  return result;
};

const getAllDashboardsFromDB = async (query: Record<string, unknown>) => {
  const DashboardQuery = new QueryBuilder(
    Dashboard.find(),
    query,
  )
    .search(DASHBOARD_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await DashboardQuery.modelQuery;
  const meta = await DashboardQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleDashboardFromDB = async (id: string) => {
  const result = await Dashboard.findById(id);

  return result;
};
const userGrowthMonthlyFromDB = async () => {
  try {
    // Get all users' data without filtering by user ID
    const userGrowthData = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, // Extract the month from the createdAt field
          year: { $year: "$createdAt" },   // Extract the year from the createdAt field
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" }, // Group by month and year
          count: { $sum: 1 },  // Count the number of users for each month
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          count: 1,
          _id: 0,
        },
      },
    ]);


    // Format the result to map each month to the corresponding user count
    const monthlyGrowth = Array.from({ length: 12 }, (_, index) => {
      const monthData = userGrowthData.find(
        (data) => data.month === index + 1
      );
      return {
        month: monthNamesShortForm[index],  // Get the month name (January, February, etc.)
        count: monthData ? monthData.count : 0, // User count or 0 if no data
      };
    });

    return monthlyGrowth;
  } catch (error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching user growth data');
  }
};


const updateDashboardIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('dashboards')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );
 
  if (!isDeletedService?.name) {
    throw new Error('Dashboard not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Dashboard');
  }

  const updatedData = await Dashboard.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Dashboard not found after update');
  }

  return updatedData;
};

const deleteDashboardFromDB = async (id: string) => {
  const deletedService = await Dashboard.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Dashboard');
  }

  return deletedService;
};

export const DashboardServices = {
  createDashboardIntoDB,
  getAllDashboardsFromDB,
  getSingleDashboardFromDB,
  updateDashboardIntoDB,
  deleteDashboardFromDB,
  userGrowthMonthlyFromDB
};
