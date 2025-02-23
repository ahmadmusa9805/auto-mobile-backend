/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Job } from "../Job/Job.model";
import { monthNamesShortForm } from "./Dashboard.constant";
import { User } from "../User/user.model";

export const AllCompletedjobMonthly = async () => {
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
  

  
      // Format the result to map each month to the corresponding job count
      const monthlyGrowth = Array.from({ length: 12 }, (_, index) => {
        const monthData = userGrowthData.find(
          (data:any) => data.month === index + 1
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


  export const userGrowthMonthly = async () => {
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
 export const jobGrowthMonthlyFromDB = async () => {
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
          (data:any) => data.month === index + 1
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
   