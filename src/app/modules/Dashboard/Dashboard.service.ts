/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { monthNamesShortForm } from './Dashboard.constant';
import mongoose from 'mongoose';
import { TDashboard } from './Dashboard.interface';
import { Dashboard } from './Dashboard.model';
import { User } from '../User/user.model';
import { Job } from '../Job/Job.model';

const createDashboardIntoDB = async (
  payload: TDashboard,
) => {
  const result = await Dashboard.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Dashboard');
  }

  return result;
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
const jobGrowthMonthlyFromDB = async () => {
  try {
    // Get all users' data without filtering by user ID
    const userGrowthData = await Job.aggregate([
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
 
const getAlljobCompletedMonthlyFromDB = async () => {
  try {
    // Get all completed jobs' data without filtering by user ID
    const userGrowthData = await Job.aggregate([
      // Match only completed jobs
      {
        $match: {
          status: 'completed', // Filter by jobs with 'completed' status
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" }, // Extract the month from the createdAt field
          year: { $year: "$createdAt" },   // Extract the year from the createdAt field
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" }, // Group by month and year
          count: { $sum: 1 },  // Count the number of completed jobs for each month
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

    // Month names array (for mapping months)
    const monthNamesShortForm = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Format the result to map each month to the corresponding job count
    const monthlyGrowth = Array.from({ length: 12 }, (_, index) => {
      const monthData = userGrowthData.find(
        (data) => data.month === index + 1
      );
      return {
        month: monthNamesShortForm[index],  // Get the short month name
        count: monthData ? monthData.count : 0, // Job count or 0 if no data
      };
    });

    return monthlyGrowth;
  } catch (error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching job completion data');
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

const getAllDashboardReportsFromDB = async () => {
  const jobGrowthMonthly = await userGrowthMonthlyFromDB()
  const completedJobMonthly = await jobGrowthMonthlyFromDB()
  const userGrowthMonthly = await getAlljobCompletedMonthlyFromDB()

  // Aggregate the total users, total jobs, total clients, and total technicians
  const totalUsers = await User.countDocuments(); // Get total number of users
  const totalJobs = await Job.countDocuments(); // Get total number of jobs
  const totalClients = await User.countDocuments({ role: 'client' }); // Get total number of clients
  const totalTechnicians = await User.countDocuments({ role: 'technician' }); // Get total number of technicians


    // Return the aggregated report
    return {
      jobGrowthMonthly,
      completedJobMonthly,
      userGrowthMonthly,
      totalUsers,
      totalJobs,
      totalClients,
      totalTechnicians,
    };
};

export const DashboardServices = {
  createDashboardIntoDB,
  getAllDashboardReportsFromDB,
  getSingleDashboardFromDB,
  updateDashboardIntoDB,
  deleteDashboardFromDB,
  userGrowthMonthlyFromDB,
  jobGrowthMonthlyFromDB,
  getAlljobCompletedMonthlyFromDB
};
