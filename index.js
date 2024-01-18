import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(
  cors({ origin: ["http://localhost:5173","https://celadon-panda-abf4e1.netlify.app", "https://farmer.sasyasystems.com"] })
);

const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: ["http://localhost:5173","https://celadon-panda-abf4e1.netlify.app", "https://farmer.sasyasystems.com"],
  },
});
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log("thisisdirname", __dirname);
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
const FARMER_ROOM = "farmerRoom";

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages from the admin
  socket.on("adminWeatherAdvisoryMessage", (message) => {
    // Broadcast the message to all farmer clients
    io.to(FARMER_ROOM).emit("farmerWeatherAdvisoryMessage", message);
  });

  socket.on("adminFertilizerAdvisoryMessage", (message) => {
    // Broadcast the message to all farmer clients
    io.to(FARMER_ROOM).emit("farmerFertilizerAdvisoryMessage", message);
  });
  // Join the respective room based on user type
  socket.on("joinRoom", (userType) => {
    socket.join(`${userType}Room`);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  // Set CORS headers for Socket.IO
  socket.handshake.headers.origin = "https://celadon-panda-abf4e1.netlify.app";
});

const PORT = 3001;
server.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

// import express from 'express'
// import * as dotenv from 'dotenv'
// import cors from 'cors'
// import connectDB from './database/connect.js'
// import weather_advisory from './routes/weather_advisory.js'
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json({limit:'50mb'}))

// app.use('/api/v1/weather_advisory',weather_advisory)

// app.get('/', async(req,res) =>{
//     res.send('Hello from Advisory app');
// })

// const startServer = async () => {
//     try{
//         connectDB(process.env.MONGODB_URL);
//         app.listen(8080,()=> console.log('Server has started on Port http://localhost:8080'))
//     }catch (err){
//         console.log(err)
//     }
// }

// startServer();
