import express from 'express';
import validateRequest from '../../middlewares/validateRequest.ts';
import { createJobValidationSchema, updateJobValidationSchema } from './Job.validation.ts';
import { JobControllers } from './Job.controller.ts';
// import { JobControllers } from 'Job.controller';
// import validateRequest from \index.ts'../../middlewares/validateRequest';
// import { createJobValidationSchema, updateJobValidationSchema } from 'Job.validation.ts';

const router = express.Router();

router.post(
  '/create-Job',
  validateRequest(createJobValidationSchema),
  JobControllers.createJob,
);

router.get(
  '/technician/:id',
  JobControllers.getAllJobsByTechnicianId,
);

router.get(
  '/user/:id',
  JobControllers.getAllJobsWithUserId,
);
router.get(
  '/grand/:id',
  JobControllers.getAllJobsByGrandIdId,
);


router.get(
  '/:id',
  JobControllers.getSingleJob,
);

router.patch(
  '/:id',
  validateRequest(updateJobValidationSchema),
  JobControllers.updateJob,
);

router.delete(
  '/:id',
  JobControllers.deleteJob,
);

router.get(
  '/',
  JobControllers.getAllJobs,
);


export const JobRoutes = router;
