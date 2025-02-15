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
import { User } from '../User/user.model';

const createJobIntoDB = async (
  payload: TJob,
) => {

 const user = await User.findById(payload.userId);

 if (!user){
  throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
 }
 if (user.role === 'technician'){
  payload.grandId = user.creatorId
 }



  const id = await generateUniqueJobId();
  payload.jobId = id as string;

  const result = await Job.create(payload);

  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Job');
  }

  await  NotificationServices.createNotificationIntoDB({
    message: 'New job Posted',
    jobId: result._id,
    isRead: false,
    status: 'created',
    isDeleted: false
  })

  return result;
};

const getAllJobsFromDB = async ( query: Record<string, unknown>) => {
  const JobQuery = new QueryBuilder(
    Job.find({ isDeleted: false })
      .populate('assignedTechnician', 'fullName profileImg role') // Selecting only name and image
      .populate('userId', 'fullName profileImg role') // Selecting only name and image
      .populate('grandId', 'fullName profileImg role'),
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
const getAllJobsByGrandIdIdFromDB = async (grandId: string, query: Record<string, unknown>) => {
  const JobQuery = new QueryBuilder(
    Job.find({
      $or: [
        { userId: grandId, isDeleted: false },
        { grandId: grandId, isDeleted: false }
      ],
    }),    
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
  const result = await Job.findById(id, { isDeleted: false }).populate('assignedTechnician', 'fullName profileImg') // Selecting only name and image
  .populate('userId', 'fullName profileImg') // Selecting only name and image
  .populate('grandId' ,'fullName profileImg');

  return result;
};

const updateJobIntoDB = async (id: string, payload: any) => {
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
      jobId: updatedData._id,
      userId: updatedData.assignedTechnician,
      isRead: false,
      status: 'raised',
      isDeleted: false
    })

    return updatedData;

  }else if(payload.assignedTechnician){
    
 const existTechnician = await User.findOne({_id: payload.assignedTechnician});
 if(!existTechnician){
  throw new Error('Technician not found');
 }
 const jobAssigned = await Job.findOne({_id: id, assignedTechnician: payload.assignedTechnician});
 if(jobAssigned){
  throw new Error('Technician aleady assigned');
 }

  const updatedData = await Job.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Job not found after update');
  }

  await  NotificationServices.createNotificationIntoDB({
    message: 'Assigned Technician To Job',
    jobId: updatedData._id,
    userId: updatedData.assignedTechnician,
    isRead: false,
    status: 'assigned',
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
  getAllJobsWithUserIdFromDB,
  getAllJobsByGrandIdIdFromDB
};
