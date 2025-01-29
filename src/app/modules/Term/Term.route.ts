import express from 'express';
import { TermControllers } from './Term.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createTermValidationSchema, updateTermValidationSchema } from './Term.validation';

const router = express.Router();

router.post(
  '/create-term',
  validateRequest(createTermValidationSchema),
  TermControllers.createTerm,
);

router.get(
  '/:id',
  TermControllers.getSingleTerm,
);

router.patch(
  '/:id',
  validateRequest(updateTermValidationSchema),
  TermControllers.updateTerm,
);

router.delete(
  '/:id',
  TermControllers.deleteTerm,
);

router.get(
  '/',
  TermControllers.getAllTerms,
);

export const TermRoutes = router;
