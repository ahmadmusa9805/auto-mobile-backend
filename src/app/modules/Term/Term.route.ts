import express from 'express';
import validateRequest from '../../middlewares/validateRequest.ts';
import { createTermValidationSchema } from './Term.validation.ts';
import { TermControllers } from './Term.controller.ts';


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
