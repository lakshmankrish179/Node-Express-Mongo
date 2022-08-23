import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import mongoose from "mongoose";
import helmet from "helmet";
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"

const app = express();
const PORT = 8800;

// env file 
dotenv.config();

//mongo DB connection using mongoose
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("");
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.get("/", (req,res) => {
   res.send("Welcome from HomePage")
});

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

// Server Listening porauth
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})