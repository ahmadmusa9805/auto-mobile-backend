
import { Server, Socket } from "socket.io";
import { ChatServices } from "./Chat.service";

const connectedUsers: { [key: string]: string } = {}; // Store userId -> socketId

export const initializeChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Register user
    socket.on("register", ({ userId, name, image }) => {
      connectedUsers[userId] = socket.id;
      socket.data = { userId, name, image }; // Store user details in socket
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Join private room for 1-to-1 chat
    socket.on("joinChat", ({ userId, otherUserId }) => {
      const roomId = [userId, otherUserId].sort().join("_"); // Unique room ID
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    // Handle sending messages
    socket.on("sendMessage", async (data) => {
      const { sender, receiver, message, image } = data;
      const roomId = [sender, receiver].sort().join("_");

      // Save to database
      const chatMessage = await ChatServices.createChatIntoDB({
        sender,
        receiver,
        message,
        image,
        isRead: false,
      });

      // Fetch sender details for real-time update
      const senderDetails = socket.data; 

      // Send message to receiver if online
      io.to(roomId).emit("receiveMessage", {
        ...chatMessage.toObject(),
        senderName: senderDetails.name,
        senderImage: senderDetails.image,
      });
    });

    // Mark messages as read
    socket.on("markAsRead", async ({ sender, receiver }) => {
      await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
      const roomId = [sender, receiver].sort().join("_");
      io.to(roomId).emit("messagesRead", { sender, receiver });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
      Object.keys(connectedUsers).forEach((key) => {
        if (connectedUsers[key] === socket.id) {
          delete connectedUsers[key];
        }
      });
    });

    
  });
};

/////////////////////////////
// import { Server, Socket } from "socket.io";
// import { ChatServices } from "./Chat.service";

// const connectedUsers: { [key: string]: string } = {}; // userId -> socketId mapping

// export const initializeChatSocket = (io: Server) => {
//   io.on("connection", (socket: Socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     // Register user connection
//     socket.on("register", (userId: string) => {
//       connectedUsers[userId] = socket.id;
//       console.log(`User ${userId} is registered with socket ID ${socket.id}`);
//     });

//     // Handle sending messages
//     socket.on("sendMessage", async (data) => {
//       const { sender, receiver, message, image } = data;

//       // Save message in database
//       const chatMessage = await ChatServices.createChatIntoDB({
//         sender,
//         receiver,
//         message,
//         image,
//         isRead: false,
//       });

//       // Send message to receiver if online
//       if (connectedUsers[receiver]) {
//         io.to(connectedUsers[receiver]).emit("receiveMessage", chatMessage);
//       }

//       // Notify sender that the message was sent
//       io.to(socket.id).emit("messageSent", chatMessage);
//     });

//     // Mark messages as read
//     socket.on("markAsRead", async ({ sender, receiver }) => {
//       await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       console.log(`User Disconnected: ${socket.id}`);
//       Object.keys(connectedUsers).forEach((key) => {
//         if (connectedUsers[key] === socket.id) {
//           delete connectedUsers[key];
//         }
//       });
//     });
//   });
// };
