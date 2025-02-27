import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TermServices } from './Term.service';
import sendResponse from '../../utils/sendResponse';


const createTerm = catchAsync(async (req, res) => {
  const { Term: TermData } = req.body;
  const result = await TermServices.createTermIntoDB(TermData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Term is created successfully',
    data: result,
  });
});

const getSingleTerm = catchAsync(async (req, res) => {

  const result = await TermServices.getSingleTermFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Term is retrieved successfully',
    data: result,
  });
});



export const TermControllers = {
  createTerm,
  getSingleTerm,
};
