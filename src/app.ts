/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
// import { createServer } from 'http';
import router from './app/routes/index';
import helmet from 'helmet';
// import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
// import { fileURLToPath } from 'url';
// import notFound from './app/middlewares/notFound';

const app: Application = express();
// const httpServer = createServer(app);


// Middleware
app.use(helmet()); // Security headers
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin:"*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // origin: ['http://192.168.12.63:5173', 'http://192.168.12.63:3001', 'http://34.233.41.57:3000', 'http://34.233.41.57:3001',],
    // credentials: true,
  })
);

app.use(express.json({ verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));

// Serve static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/v1', router);


// Manually define __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.get('/', (req: Request, res: Response) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.send('Welcome To Property API!');

});



// app.use(notFound);
app.use(globalErrorHandler);




export default app;












