/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { usersSearchableFields } from './user.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { OtpServices } from '../Otp/otp.service';
import { Job } from '../Job/Job.model';
// import { OtpServices } from '../Otp/otp.service';

export const createClientIntoDB = async (payload: TUser) => {
  payload.role = 'client'
    const newClient = await User.create(payload);
    if (!newClient) throw new Error('Failed to create user');
    
    await OtpServices.generateAndSendOTP(payload.email);
    return newClient;

};
// export const createClientIntoDB = async (payload: TUser) => {
//   console.log('payload', payload);
  
//   const months = [
//     { name: "January", month: 1 },
//     { name: "February", month: 2 },
//     { name: "March", month: 3 },
//     { name: "April", month: 4 },
//     { name: "May", month: 5 },
//     { name: "June", month: 6 },
//     { name: "July", month: 7 },
//     { name: "August", month: 8 },
//     { name: "September", month: 9 },
//     { name: "October", month: 10 },
//     { name: "November", month: 11 },
//     { name: "December", month: 12 }
//   ];

//   // Realistic sample data for clients and technicians
//   const names = ["John Doe", "Jane Smith", "Alice Brown", "Bob Johnson", "Charlie Davis"];
//   const emails = ["john@example.com", "jane@example.com", "alice@example.com", "bob@example.com", "charlie@example.com"];
//   const contactNos = ["+1234567890", "+0987654321", "+1122334455", "+2233445566", "+3344556677"];
//   const defaultPassword = "password123"; // Dummy password for testing purposes

//   // For each month, insert some users with realistic creation dates
//   for (const month of months) {
//     for (let i = 0; i < 10; i++) { // Insert 10 users per month for testing
//       const randomName = names[Math.floor(Math.random() * names.length)];
//       const randomEmail = emails[Math.floor(Math.random() * emails.length)];
//       const randomContactNo = contactNos[Math.floor(Math.random() * contactNos.length)];
//       const role = Math.random() > 0.5 ? "client" : "technician"; // Randomly assign 'client' or 'technician'

//       // Create a random day in the month
//       const randomDay = Math.floor(Math.random() * 28) + 1; // Ensure we get a valid day (1-28)

//       // Create a valid Date object using Date(year, monthIndex, day)
//       const createdAt = new Date(2025, month.month - 1, randomDay); // Month is 0-indexed, so subtract 1

//       // Ensure the createdAt is valid
//       if (isNaN(createdAt.getTime())) {
//         console.error("Invalid Date generated:", createdAt);
//         continue; // Skip this iteration if the date is invalid
//       }

//       const user = new User({
//         fullName: randomName,
//         contactNo: randomContactNo,
//         email: randomEmail,
//         password: defaultPassword, // Provide a password
//         role: role,
//         createdAt: createdAt, // Valid date object
//       });

//       try {
//         await user.save();
//       } catch (err) {
//         console.error("Error saving user:", err);
//       }
//     }
//   }

//   return 'success';
// };
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
 const newAdmin = await User.create(payload);
 if (!newAdmin) throw new Error('Failed to create admin');
await OtpServices.generateAndSendOTP(payload.email);

     return newAdmin;
};

const getMe = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail });

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
    // if(result?.status === 'blocked'){
    //   if(result?.role === 'client'){
    //      await Client.findOneAndUpdate({userId: result?._id}, {status: 'blocked'}, {new: true}).populate('userId');
    //    }
       
    //    if(result?.role === 'admin'){
    //     await Admin.findOneAndUpdate({userId: result?._id}, {status: 'blocked'}, {new: true}).populate('userId');
    //   }

     
    // }

    // if(result?.status === 'active'){
    //   if(result?.role === 'client'){
    //      await Client.findOneAndUpdate({userId: result?._id}, {status: 'active'}, {new: true}).populate('userId');
    //    }
       
    //    if(result?.role === 'admin'){
    //     await Admin.findOneAndUpdate({userId: result?._id}, {status: 'active'}, {new: true}).populate('userId');
    //   }

     
    // }




  return result;
};
const updateUserIntoDB = async (id: string, payload: Partial<TUser>, file?: any) => {
  const {  ...userData } = payload;
  // const { fullName, ...userData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...userData };

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
  const studentQuery = new QueryBuilder(User.find({status: 'active',role: 'technician', isDeleted: false}), query)
    .search(usersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;
  console.log(result, "test");
  // const res1 = await Job.find({assignedTechnician: result[0]?._id, status: 'completed'}).populate('assignedTechnician');
  return {
    meta,
    result,
  };
};






const getAllSuperVisorsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active',role: 'supervisor', isDeleted: false}), query)
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
const getAllClientsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active',role: 'client', isDeleted: false}), query)
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
