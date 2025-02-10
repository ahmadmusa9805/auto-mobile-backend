
// import { Server, Socket } from "socket.io";
// import { ChatServices } from "./Chat.service";

// const connectedUsers: { [key: string]: string } = {}; // Store userId -> socketId

// export const initializeChatSocket = (io: Server) => {
//   io.on("connection", (socket: Socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     // Register user
//     socket.on("register", ({ userId, name, image }) => {
//       connectedUsers[userId] = socket.id;
//       socket.data = { userId, name, image }; // Store user details in socket
//       console.log(`User ${userId} registered with socket ${socket.id}`);
//     });


//     // socket.on("chatMessage", (msg) => {
//     //     console.log("Message received from client:", msg);
//     //     io.emit("chatMessage", msg);
//     //   });


//     // Join private room for 1-to-1 chat
//     socket.on("joinChat", ({ userId, otherUserId }) => {
//       const roomId = [userId, otherUserId].sort().join("_"); // Unique room ID
//       socket.join(roomId);
//       console.log(`User ${userId} joined room ${roomId}`);
//     });

//     // Handle sending messages
//     socket.on("chatMessage", async (data) => {
//       console.log("Message received from client:", data);
//       const { sender, receiver, message, image } = data;
//       const roomId = [sender, receiver].sort().join("_");

//       // Save to database
//       const chatMessage = await ChatServices.createChatIntoDB({
//         sender,
//         receiver,
//         message,
//         image,
//         isRead: false,
//       });

//       // Fetch sender details for real-time update
//       const senderDetails = socket.data; 

//       // Send message to receiver if online
//       io.to(roomId).emit("receiveMessage", {
//         ...chatMessage.toObject(),
//         senderName: senderDetails.name,
//         senderImage: senderDetails.image,
//       });
//     });

//     // Mark messages as read
//     socket.on("markAsRead", async ({ sender, receiver }) => {
//       await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
//       const roomId = [sender, receiver].sort().join("_");
//       io.to(roomId).emit("messagesRead", { sender, receiver });
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
/////////
import { Server, Socket } from "socket.io";
import { ChatServices } from "./Chat.service";

const connectedUsers: { [key: string]: string } = {}; // Store userId -> socketId

export const initializeChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Register user
    socket.on("register", ({ userId, name, image }) => {
      if (!userId) return;

      connectedUsers[userId] = socket.id;
      socket.data = { userId, name, image }; // Store user details in socket
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Join private chat room
    socket.on("joinChat", ({ userId, otherUserId }) => {
      if (!userId || !otherUserId) return;

      const roomId = [userId, otherUserId].sort().join("_"); // Unique room ID
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    // Handle sending messages
    // socket.on("chatMessage", async (data) => {
    //   console.log("Message received from client:", data);

    //   const { sender, receiver, message, image } = data;

    //   // Validation check
    //   if (!sender || !receiver || !message) {
    //     console.error("Invalid chat data received:", data);
    //     return;
    //   }

    //   const roomId = [sender, receiver].sort().join("_");
    //   console.log("roomId:", roomId);


    //   try {
    //     // Save to database
    //     const chatMessage = await ChatServices.createChatIntoDB({
    //       sender,
    //       receiver,
    //       message,
    //       image: image || null,
    //       isRead: false,
    //       createdAt: new Date(),
    //       isDeleted: false,
    //     });

    //     // Fetch sender details for real-time update
    //     const senderDetails = socket.data || {};

    //     // Send message to the receiver if they are online
    //     io.to(roomId).emit("receiveMessage", {
    //       ...chatMessage.toObject(),
    //       senderName: senderDetails.name || "Unknown",
    //       senderImage: senderDetails.image || null,
    //     });

    //     console.log(`Message sent to room ${roomId}:`, chatMessage);
    //   } catch (error) {
    //     console.error("Error saving message:", error);
    //   }
    // });
    socket.on("chatMessage", async (data) => {
      console.log("Message received from client:", data);
      const { sender, receiver, message, image } = data;
      if (!sender || !receiver || !message) return;
    
      const chatMessage = await ChatServices.createChatIntoDB({
        sender,
        receiver,
        message,
        image: image || null,
        isRead: false,
        createdAt: new Date(),
        isDeleted: false,
      });
    
      const roomId = [sender, receiver].sort().join("_");
      io.to(roomId).emit("receiveMessage", chatMessage.toObject());
    
      console.log(`Message sent:`, chatMessage);
    });

    // // Mark messages as read
    // socket.on("markAsRead", async ({ sender, receiver }) => {
    //   if (!sender || !receiver) return;

    //   try {
    //     await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
    //     const roomId = [sender, receiver].sort().join("_");
    //     io.to(roomId).emit("messagesRead", { sender, receiver });

    //     console.log(`Messages marked as read for room ${roomId}`);
    //   } catch (error) {
    //     console.error("Error marking messages as read:", error);
    //   }
    // });
    socket.on("markAsRead", async ({ sender, receiver }) => {
      await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
      const roomId = [sender, receiver].sort().join("_");
      io.to(roomId).emit("messagesRead", { sender, receiver });
    
      console.log(`Messages marked as read for room ${roomId}`);
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
