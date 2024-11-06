import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import cors from "cors";

//connection to database
await mongoose.connect(process.env.MONGO_URI);

//create an express app
const app = express();

//middlewares
app.use(express.json());

//routers 
app.use(cors());
app.use(userRouter);

//port listening
const PORT =3100;
app.listen(PORT, () => { 
    console.log(`Server running on port${PORT}`);
});