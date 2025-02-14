import http from "http";
import { Server } from "socket.io";
// import app from "./app.ts";
import app from "./app.ts"; 
import { initializeChatSocket } from './app/modules/Chat/chat.socket.ts';
import mongoose from 'mongoose';
import config from './app/config/index.ts';
import seedSuperAdmin from './app/DB/index.ts';
// let server = http.createServer(app);
// let server: Server;
const server = http.createServer(app);
async function main() {
  try {
    // await mongoose.connect("mongodb+srv://property-db:tQuvNkBQyuqlH7e6@cluster0.1ddal.mongodb.net/property-development?retryWrites=true&w=majority&appName=Cluster0" as string);
    await mongoose.connect(config.database_url as string);
    // await mongoose.connect('mongodb://localhost:27017/mydatabase');
    // const port = config.port || 3000;  // Default to 3000 if undefined

    await seedSuperAdmin();

   

       // Initialize Socket.IO
       const io = new Server(server, {
        // cors: {
        //   origin: "*", // Replace with frontend URL
        // },
        cors: {
          origin: "http://localhost:3000", // Ensure this is correct for Next.js frontend
          methods: ["GET", "POST"],
        },
      });

    // Attach chat socket handlers
    initializeChatSocket(io);


  // Start the server
  server.listen(config.port, () => {
    console.log(`🚀 Server is running on http://10.0.60.52:${config.port}`);
  });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
}

// Handle server shutdown gracefully
main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  // if (server) {
  //   server.close(() => {
  //     process.exit(1);
  //   });
  // }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  // console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server...');
  server.close(() => console.log('Server closed.'));
});