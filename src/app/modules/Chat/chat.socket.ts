
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

    // // Join private chat room
    // socket.on("joinChat", ({ userId, otherUserId }) => {
    //   if (!userId || !otherUserId) return;

    //   const roomId = [userId, otherUserId].sort().join("_"); // Unique room ID
    //   socket.join(roomId);
    //   console.log(`User ${userId} joined room ${roomId}`);
    // });

    
    // socket.on('joinRoom', ({ room }) => {
    //   // const room = `${actorId}-${adminId}`; // Unique room
    //   socket.join(room);
    //   console.log(`${socket.id} joined room: ${room}`);
    // });
    socket.on("joinChat", ({ userId, otherUserId }) => {
      if (!userId || !otherUserId) return;
    
      const roomId = [userId, otherUserId].sort().join("_"); // Unique room ID
      socket.join(roomId);
      console.log(`✅ User ${userId} joined room ${roomId}`);
      console.log("🔍 Current rooms:", socket.rooms); // Debug: Check which rooms this socket has joined
    });

    socket.on("chatMessage", async (data) => {
      console.log("Message received from client:", data);

      const { sender, receiver, fileUrl, regName, message, fileType } = data;
      console.log("sender", sender);
      console.log("receiver", receiver);
      console.log("fileUrl", fileUrl);
      console.log("message", message);
      console.log("fileType", fileType);

      // const { sender, receiver, fileUrl, fileType, regName, message } = data;
      if (!sender || !receiver || !fileUrl){
        console.log("inside", fileType);

      return;
      }
        
      // const { sender, receiver, message, image, regName } = data;
      // if (!sender || !receiver || !message) { 
        
      //   console.log("Invalid message data");
      //     return;
    
      // } 
    
            // Save message with file URL
        const chatMessage = await ChatServices.createChatIntoDB({
        sender,
        receiver,
        message, // No text, only file
        image: fileUrl,
        // fileType: fileType || "image",
        //   image: image || null,
        regName,
        createdAt: new Date(),
        isRead: false,
        isDeleted: false,
        });
    
      const roomId = [sender, receiver].sort().join("_");
      console.log(`📢 Room ID: ${roomId}`);
      console.log("📤 Sending message to frontend:", chatMessage.toObject());

      io.to(roomId).emit("receiveMessage", chatMessage.toObject());
    
      console.log(`Message sent:`, chatMessage);
    });

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
