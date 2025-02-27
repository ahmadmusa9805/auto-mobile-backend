/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';
import { ObjectId } from 'mongodb'; // Import ObjectId


import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import { OtpServices } from '../Otp/otp.service';
import QueryBuilder from '../../builder/QueryBuilder';
import { usersSearchableFields } from './user.constant';
import AppError from '../../errors/AppError';
import { Job } from '../Job/Job.model';


export const createClientIntoDB = async (payload: TUser) => {
  payload.role = 'client'
    const newClient = await User.create(payload);
    if (!newClient) throw new Error('Failed to create user');
    
    await OtpServices.generateAndSendOTP(payload.email);
    return newClient;

};
export const createTechnicianIntoDB = async (payload: TUser) => {

  payload.role = 'technician'
 const newTechnician = await User.create(payload);
 if (!newTechnician) throw new Error('Failed to create technician');
 await OtpServices.generateAndSendOTP(payload.email);
return newTechnician;

};
export const createSuperVisorIntoDB = async (payload: TUser) => {	

  payload.role = 'supervisor'
 const newSupervisor = await User.create(payload);
 if (!newSupervisor) throw new Error('Failed to create user');
 await OtpServices.generateAndSendOTP(payload.email);

     return newSupervisor;
};
export const createAdminIntoDB = async (payload: TUser) => {	

  payload.role = 'admin'
  payload.otpVerified = true
 const newAdmin = await User.create(payload);
 if (!newAdmin) throw new Error('Failed to create admin');
await OtpServices.generateAndSendOTP(payload.email);

     return newAdmin;
};

const getMe = async (userEmail: string) => {
  // const result = await User.findOne({ email: userEmail });
  const result = await User.findOne({ email: userEmail }).populate('creatorId', 'fullName profileImg role');

  return result;
};
const getSingleUserIntoDB = async (id: string) => {
  const result = await User.findOne({ _id: id, isDeleted: false });

  return result;
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active', isDeleted: false}), query)
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const getAllSuperVisorsWithUserIdFromDB = async (creatorId: string, query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({ creatorId,status:'active', isDeleted: false}), query)
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
    

  return result;
};
const updateUserIntoDB = async (id: string, payload?: Partial<TUser>, file?: any) => {
 let modifiedUpdatedData: Record<string, unknown> = {};
 if(payload) {
  const {  ...userData } = payload ;
    modifiedUpdatedData = { ...userData };
 } 
  // const { fullName, ...userData } = payload;


  // if (name && Object.keys(name).length) {
  //   for (const [key, value] of Object.entries(name)) {
  //     modifiedUpdatedData[`name.${key}`] = value;
  //   }
  // }

  // Handle file upload if present
  if (file) {
    modifiedUpdatedData.profileImg = file.location as string;
  }

  const result = await User.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  return result;
};
const deleteUserFromDB = async (id: string) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start transaction

  try {
    // Step 1: Soft-delete the user
    const deletedUser = await User.findByIdAndDelete(
      id,
      { new: true, session } // Pass the session
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    // Step 2: Soft-delete the associated quote
    const deletedQuote = await User.findOneAndUpdate(
      { userId: id }, // Find the single quote associated with the user
      { isDeleted: true }, // Set isDeleted to true
      { new: true, session } // Pass the session
    );

    // Optional: Validate that a quote was found and updated
    if (!deletedQuote) {
      console.warn(`No quote found for user with ID ${id}`);
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return deletedUser;
  } catch (error) {
    // Rollback the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw error; // Propagate the error to be handled by the caller
  }
};
const getUsersMonthlyFromDB = async () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st, current year
  const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1); // January 1st, next year

  const result = await User.aggregate([
    {
      $match: {
        status: 'active',
        isDeleted: false,
        createdAt: { $gte: startOfYear, $lt: endOfYear } // Filter users created in the current year
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" }, // Group by month of 'createdAt'
        count: { $sum: 1 } // Count users per month
      }
    },
    {
      $sort: { _id: 1 } // Sort by month in ascending order
    }
  ]);

  // Format result to include month names (optional)
  const formattedResult = result.map(item => ({
    month: new Date(0, item._id - 1).toLocaleString('default', { month: 'long' }),
    count: item.count
  }));

  return formattedResult;
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active',role: 'admin', isDeleted: false}), query)
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getAllTechniciansFromDB = async (query: Record<string, unknown>) => {

  const studentQuery = new QueryBuilder(
    User.find({ status: 'active', role: 'technician', isDeleted: false }),
    query
  )
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const technicians = await studentQuery.modelQuery;

  // Fetch all completed jobs
  const completedJobs = await Job.find({ status: 'completed' });

  // Map completed jobs to technicians
  const result = technicians.map((tech: any) => {
    const jobsForTech = completedJobs.filter((job:any) =>
      new ObjectId(job.assignedTechnician).equals(tech._id) // Convert and compare
    );
    return {
      ...tech._doc,
      completedJobs: jobsForTech.length, // Add the count of completed jobs
    };
  });

  return {
    meta,
    result,
  };
};

const getAllSuperVisorsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active',role: 'supervisor', isDeleted: false}).populate('creatorId', 'fullName'), query)
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const superVisors = await studentQuery.modelQuery;


// Fetch all completed jobs
const completedJobs = await Job.find({ status: 'completed' });

// Map completed jobs to technicians
const result = superVisors.map((superVisor: any) => {
  const jobsForSuperVisor = completedJobs.filter((job:any) =>
    new ObjectId(job.userId).equals(superVisor._id) // Convert and compare
  );
  return {
    ...superVisor._doc,
    completedJobs: jobsForSuperVisor.length, // Add the count of completed jobs
  };
});



  return {
    meta,
    result,
  };
};
const getAllClientsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active',role: 'client', isDeleted: false}), query)
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const clients = await studentQuery.modelQuery;


  // Fetch all completed jobs
  const completedJobs = await Job.find({ status: 'completed' });

  // Map completed jobs to technicians
  const result = clients.map((client: any) => {
    const jobsForClient = completedJobs.filter((job:any) =>
      new ObjectId(job.userId).equals(client._id) // Convert and compare
    );
    return {
      ...client._doc,
      completedJobs: jobsForClient.length, // Add the count of completed jobs
    };
  });


  return {
    meta,
    result,
  };
};


export const UserServices = {
  getAllTechniciansFromDB,
  getAllSuperVisorsFromDB,
  getAllClientsFromDB,
  createClientIntoDB,
  createAdminIntoDB,
  createSuperVisorIntoDB,
  createTechnicianIntoDB,
  getSingleUserIntoDB,
  getUsersMonthlyFromDB, 
  deleteUserFromDB,
  getMe,
  changeStatus,
  getAllUsersFromDB,
  updateUserIntoDB, 
  getAllAdminsFromDB, 
  getAllSuperVisorsWithUserIdFromDB
};
