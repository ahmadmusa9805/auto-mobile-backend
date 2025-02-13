import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobServices } from './Job.service';

const createJob = catchAsync(async (req, res) => {
  const { Job: JobData } = req.body;
  const result = await JobServices.createJobIntoDB(JobData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job is created successfully',
    data: result,
  });
});

const getSingleJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.getSingleJobFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job is retrieved successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (req, res) => {
  const result = await JobServices.getAllJobsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllJobsWithUserId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.getAllJobsWithUserIdFromDB(id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllJobsByTechnicianId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.getAllRaiedJobsByTechnicianIdFromDB(id ,  req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllJobsByGrandIdId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.getAllJobsByGrandIdIdFromDB(id ,  req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Job } = req.body;
  const result = await JobServices.updateJobIntoDB(id, Job);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job is updated successfully',
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobServices.deleteJobFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job is deleted successfully',
    data: result,
  });
});

export const JobControllers = {
  createJob,
  getSingleJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getAllJobsByTechnicianId,
  getAllJobsWithUserId,
  getAllJobsByGrandIdId
};
