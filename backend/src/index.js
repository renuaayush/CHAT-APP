// import express from "express"
// import dotenv from "dotenv"
// import cookieparser from "cookie-parser"
// import cors from "cors"



// import authRoutes from "./routes/auth.route.js"
// import messageRoutes from "./routes/message.route.js"
// import connectdb from "./lib/db.js"
// dotenv.config() // with out using this we cannot process the dot env variables
// // in connection url  ,  before  ? we need to give out data base name to be created else
// // it will create a data base with name test
// const app = express()
// const PORT = process.env.PORT
// app.use(express.json())//it makes the input data in to json formaate
// app.use(cookieparser());
// // app.use(cors({
// //     origin:"http://localhost:5173",
// //     credentials:true,
// // }));

// app.use(cors({
//     origin: "http://localhost:5173",  // Make sure this is the correct frontend URL
//     credentials: true,  // Allow cookies to be sent/received
//   }));
  

// app.use("/api/auth", authRoutes)
// app.use("/api/message" , messageRoutes)

// app.listen(PORT, ()=>{
//     console.log(`server running on port ${PORT}` )
//     connectdb()
// })


















import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import multer from 'multer';

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectdb from "./lib/db.js";
import { app,server } from "./lib/socket.js";

import path from "path"

dotenv.config(); // Without this, environment variables won't be loaded


const PORT = process.env.PORT;
const __dirname = path.resolve();

// Increase the JSON payload size limit
app.use(express.json({ limit: '50mb' })); // Allow up to 50MB JSON payload

// Middleware for parsing cookies
app.use(cookieparser());

// CORS configuration (ensure frontend URL is correct)
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,  // Allow cookies to be sent/received
}));

// File upload handling with multer (image uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Set file size limit to 50MB
});

// Sample file upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send({ message: 'File uploaded successfully', file: req.file });
});

// Routes for authentication and messages
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectdb();  // Connect to the database
});
