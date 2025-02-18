import express, { NextFunction, Request, Response } from 'express';
import { uploadFileS3 } from '../../utils/UploaderS3.ts';
import { UploadControllers } from './Upload.controller.ts';
import validateRequest from '../../middlewares/validateRequest.ts';
import { updateUploadValidationSchema } from './Upload.validation.ts';

// import { upload } from '..\..\utils\upload';

const router = express.Router();

router.post(
  '/',
  // upload.single("file"),
  uploadFileS3(true).single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (error) {
        next(error);
      }
    }
    next();
  },
  
  UploadControllers.createUpload,
);

router.get(
  '/:id',
  UploadControllers.getSingleUpload,
);

router.patch(
  '/:id',
  validateRequest(updateUploadValidationSchema),
  UploadControllers.updateUpload,
);

router.delete(
  '/:id',
  UploadControllers.deleteUpload,
);

router.get(
  '/',
  UploadControllers.getAllUploads,
);

export const UploadRoutes = router;
