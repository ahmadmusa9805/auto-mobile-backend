/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { JOB_SEARCHABLE_FIELDS } from './Job.constant';
import mongoose from 'mongoose';
import { TJob } from './Job.interface';
import { Job } from './Job.model';
import { NotificationServices } from '../Notification/Notification.service';
import generateUniqueJobId from './job.util';
// import { User } from '../User/user.model';

const createJobIntoDB = async (
  payload: TJob,
) => {

  const id = await generateUniqueJobId();
  payload.jobId = id as string;

  const result = await Job.create(payload);
  
  // if (!result) {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Job');
  // }

  return result;
};

const getAllJobsFromDB = async ( query: Record<string, unknown>) => {
  const JobQuery = new QueryBuilder(
    Job.find({isDeleted: false}).populate('assignedTechnician'),
    query,
  )
    .search(JOB_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await JobQuery.modelQuery;
  const meta = await JobQuery.countTotal();

  return {
    result,
    meta,
  };
};
const getAllJobsWithUserIdFromDB = async (userId: string,query: Record<string, unknown>) => {
  const JobQuery = new QueryBuilder(
    Job.find({userId, isDeleted: false}).populate('userId'),
    query,
  )
    .search(JOB_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await JobQuery.modelQuery;
  const meta = await JobQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getAllRaiedJobsByTechnicianIdFromDB = async (assignedTechnician: string, query: Record<string, unknown>) => {
  const JobQuery = new QueryBuilder(
    Job.find({assignedTechnician: assignedTechnician, isDeleted: false}),
    // Job.find({raisedId,isDeleted: false}).populate('assignedTechnician'),
    query,
  )
    .search(JOB_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await JobQuery.modelQuery;
  const meta = await JobQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleJobFromDB = async (id: string) => {
  const result = await Job.findById(id, { isDeleted: false }).populate('assignedTechnician');

  return result;
};

const updateJobIntoDB = async (id: string, payload: any) => {
console.log(id, "id", payload)
  const isDeletedService = await mongoose.connection
    .collection('jobs')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
    );

  if (!isDeletedService) {
      throw new Error('Job not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Job');
  }

  if(payload.status === 'raised'){

    const updatedData = await Job.findByIdAndUpdate(
      { _id: id },
        payload,
      { new: true, runValidators: true },
    );
   
    if (!updatedData) {
      throw new Error('Job not found after update');
    }

     await  NotificationServices.createNotificationIntoDB({
      message: 'New job raised',
      jobId: id,
      userId: payload.userId,
      isRead: false,
      isDeleted: false
    })

    return updatedData;

  }else{
    
  const updatedData = await Job.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Job not found after update');
  }

  return updatedData;

  }
 
};

const deleteJobFromDB = async (id: string) => {
  const deletedService = await Job.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Job');
  }

  return deletedService;
};

export const JobServices = {
  createJobIntoDB,
  getAllJobsFromDB,
  getSingleJobFromDB,
  updateJobIntoDB,
  deleteJobFromDB,
  getAllRaiedJobsByTechnicianIdFromDB,
  getAllJobsWithUserIdFromDB
};
