/* eslint-disable no-undef */
// import express, { Request } from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// // Fix __dirname issue for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req: Request, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads");
//     cb(null, uploadPath);
//   },
//   filename: (req: Request, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
//     cb(null, uniqueName);
//   },
// });

// // File filter to allow only specific file types
// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4", "application/pdf", "application/msword"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"), false);
//   }
// };

// export const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } });
//////
// import express from "express"; // ✅ Import Express correctly
// import { Request } from "express"; // ✅ Import Request separately
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// // Fix __dirname issue for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req: Request, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads");
//     cb(null, uploadPath);
//   },
//   filename: (req: Request, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
//     cb(null, uniqueName);
//   },
// });

// // File filter to allow only specific file types
// const fileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     cb: multer.FileFilterCallback
//   ) => {
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4", "application/pdf", "application/msword"];
    
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type") as unknown as null, false); // ✅ Cast Error to null type
//     }
//   };

// // Export multer instance
// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// });
///////
import { Request } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// Fix __dirname issue for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Correct path for uploads folder (since it's in the root directory)
// const uploadPath = path.join(__dirname, "../../uploads"); // ❌ Incorrect
// ✅ Correct: Adjusted for the root directory
const rootUploadPath = path.join(__dirname, "../../../uploads");

// Ensure `uploads/` folder exists in the root directory
if (!fs.existsSync(rootUploadPath)) {
  fs.mkdirSync(rootUploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, rootUploadPath); // ✅ Set destination to root uploads folder
  },
  filename: (req: Request, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueName);
  },
});

// File filter to allow only specific file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4", "application/pdf", "application/msword"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type") as unknown as null, false);
  }
};

// Export multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit to 50MB
});
