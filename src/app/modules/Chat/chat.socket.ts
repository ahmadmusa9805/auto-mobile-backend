import { Server, Socket } from "socket.io";
import { ChatServices } from "./Chat.service";

const connectedUsers: { [key: string]: string } = {}; // userId -> socketId mapping

export const initializeChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Register user connection
    socket.on("register", (userId: string) => {
      connectedUsers[userId] = socket.id;
      console.log(`User ${userId} is registered with socket ID ${socket.id}`);
    });

    // Handle sending messages
    socket.on("sendMessage", async (data) => {
      const { sender, receiver, message, image } = data;

      // Save message in database
      const chatMessage = await ChatServices.createChatIntoDB({
        sender,
        receiver,
        message,
        image,
        isRead: false,
      });

      // Send message to receiver if online
      if (connectedUsers[receiver]) {
        io.to(connectedUsers[receiver]).emit("receiveMessage", chatMessage);
      }

      // Notify sender that the message was sent
      io.to(socket.id).emit("messageSent", chatMessage);
    });

    // Mark messages as read
    socket.on("markAsRead", async ({ sender, receiver }) => {
      await ChatServices.markMessagesAsReadIntoDB(sender, receiver);
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
