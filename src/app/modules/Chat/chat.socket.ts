
import { Server, Socket } from "socket.io";
import { ChatServices } from "./Chat.service";

const connectedUsers: { [key: string]: string } = {}; // Store userId -> socketId

// Helper function to generate a unique roomId
const generateRoomId = (userId: string, otherUserId: string): string => {
  return [userId, otherUserId].sort().join("_"); // Unique room ID
};

export const initializeChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Register user
    socket.on("register", ({ userId, name }) => {
      if (!userId) return;
      connectedUsers[userId] = socket.id;
      socket.data = { userId, name }; // Store user details in socket
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });



    socket.on("joinChat", ({ userId, otherUserId }) => {
      if (!userId || !otherUserId) return;
    
      // const roomId = [userId, otherUserId].sort().join("_"); // Unique room ID
      const roomId = generateRoomId(userId, otherUserId);
      socket.join(roomId);
      console.log(`✅ User ${userId} joined room ${roomId} Current rooms:  ${socket.rooms}`); // Debug: Check which rooms this socket has joined
    });

    socket.on("chatMessage", async (data) => {
      const { sender, receiver, fileUrl, regName, message } = data;
      // const { sender, receiver, fileUrl, fileType, regName, message } = data;

      if (!sender || !receiver) return;  // Validate data
    
         // Save message with file URL
        const chatMessage = await ChatServices.createChatIntoDB({
        sender,
        receiver,
        message, // No text, only file
        image: fileUrl,
        regName,
        isRead: false,
        // fileType: fileType || "image",
        // createdAt: new Date(),
        // isDeleted: false,
        });
    
      // const roomId = [sender, receiver].sort().join("_");
      const roomId = generateRoomId(sender, receiver);
      console.log(`📢 Room ID: ${roomId}`);
      console.log("📤 Sending message to frontend:", chatMessage.toObject());

      io.to(roomId).emit("receiveMessage", chatMessage.toObject());
    });

    socket.on("markAsRead", async ({ sender, receiver }) => {
      await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
      // const roomId = [sender, receiver].sort().join("_");
      const roomId = generateRoomId(sender, receiver);
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
