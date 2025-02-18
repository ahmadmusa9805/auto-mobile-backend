import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.ts';
import { PrivacyServices } from './Privacy.service.ts';
import sendResponse from '../../utils/sendResponse.ts';


const createPrivacy = catchAsync(async (req, res) => {
  const { Privacy: PrivacyData } = req.body;
  const result = await PrivacyServices.createPrivacyIntoDB(PrivacyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Privacy is created successfully',
    data: result,
  });
});

const getSinglePrivacy = catchAsync(async (req, res) => {
  const result = await PrivacyServices.getSinglePrivacyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Privacy is retrieved successfully',
    data: result,
  });
});







export const PrivacyControllers = {
  createPrivacy,
  getSinglePrivacy,
};
