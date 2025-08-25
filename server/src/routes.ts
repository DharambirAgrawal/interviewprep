import { upload } from "./app";
import { Application, Request, Response, NextFunction } from "express";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./middlewares/ErrorHandler";
import { serviceRouter } from "./api/service/service.routes";
import { authRouter } from "./api/auth/auth.routes";
import { onboardRouter } from "./api/onboard/onboard.routes";
import profileRouter from "./api/profile/profile.routes";

// Define routes function with proper typing for Express app
const routes = (app: Application): void => {
  // Example route using the upload middleware

  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Home page");
  });
  app.get("/health", async (req: Request, res: Response) => {
    // res.status(200).send("OK");
    res.status(200).json({
      message: "Server is up and running",
      success: true,
    });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/service", serviceRouter);
  app.use("/api/onboard", upload.any(), onboardRouter);
  app.use("/api/profile", profileRouter);

  //   app.use("/api/media", upload.any(), mediaRouter);

  // Catch-all for undefined routes with AppError
  app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  });

  // Use the error handler middleware
  app.use(errorHandler);
};

export default routes;
