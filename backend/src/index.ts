import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { User } from "./models/User";
import { index } from "./routes/index";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);

app.get("/test", async (_, res) => {
    const userCount = await User.countDocuments();
    res.json({ message: `Users in DB: ${userCount}` });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
