import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import notesRoutes from "./routes/nodeRoutes.js";
import { connectDB } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// middleware
app.use(cors({
  origin:"http://localhost:5173"
}));

app.use(express.json()); //this middleware will parse JSON bodies: req.body
// created simple custom middleware// app.use((req, res, next)=>{
// console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started at PORT: 5001");
  });
});

// mongodb+srv://explorer250101_db_user:gwXcFCh7bZRWzyzn@cluster0.8dt3map.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
