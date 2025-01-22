import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoute from "./Routes/UserRoute";
import CarRoute from "./Routes/CarRoute";
import BoyRoute from "./Routes/BoyRoute";
import ReviewRoute from "./Routes/ReviewRoute";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const mongoUrl = process?.env?.MONGO_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not defined");
}

// connect to mongoose
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("mongoDB connection established");
});
mongoose.connection.on("error", () => {
  console.log("connection error");
});

// middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        [
          "https://backend-zeta-livid-99.vercel.app",
          "https://boa-backend.vercel.app",
          "http://localhost:5173",
          "http://localhost:5174",
          "https://www.eaglecountybank.com",
          "https://eaglecountybank.vercel.app",
        ].includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome hello worldss");
});

// endpoints
app.use("/car", CarRoute);
app.use("/user", UserRoute);
app.use("/boy", BoyRoute);
app.use("/review", ReviewRoute);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

export default app;
