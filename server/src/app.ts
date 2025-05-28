import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import express from "express";
import { logger } from "./utils/logger";
import cookieParser from "cookie-parser";
import routes from "./routes";

dotenv.config();

const app = express();

// Configure multer storage (in-memory storage in this case)
export const upload = multer({});

// Middleware to initialize passport and handle session
app.use(
  cors({
    credentials: true, // Allow sending cookies along with the request
  })
);
app.use(logger);


// Now handle URL-encoded and JSON body parsing
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data (if needed)


// Define routes after middleware configuration
routes(app);

export default app;