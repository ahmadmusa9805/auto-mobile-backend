import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createTermValidationSchema } from './Term.validation';
import { TermControllers } from './Term.controller';


const router = express.Router();

router.post(
  '/create-term',
  validateRequest(createTermValidationSchema),
  TermControllers.createTerm,
);

router.get(
  '/',
  TermControllers.getSingleTerm,
);


export const TermRoutes = router;
