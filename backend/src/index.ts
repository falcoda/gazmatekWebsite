// Importing environment variables
import dotenv from "dotenv";
dotenv.config();
// Importing necessary modules
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";

import helmet from "helmet";
import path from "path";

import { botMiddleware } from "./middleware/botMiddleware";
import { redirectMiddleware } from "./middleware/redirectMiddleware";

const expressStaticGzip = require("express-static-gzip");

// Creating the express app
const app: Express = express();

// CORS setup
const corsOptions = {
  origin: "http://localhost",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Using body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  bodyParser.json()(req, res, next);
});

// Using helmet middleware

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "*.google-analytics.com"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "trusted-cdn.com",
          "https://www.googletagmanager.com/",
          "https://accounts.google.com/",
          "*.google-analytics.com",
        ],
        connectSrc: [
          "'self'",
          "https://www.nestohm.com/",
          "https://nestohm.com/",
          "https://region1.google-analytics.com/",
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://storage.googleapis.com/falcohm/",
        ],
        objectSrc: ["'self'", "blob:"],
        frameSrc: ["'self'", "blob:", "https://w.soundcloud.com"],
      },
    },
    crossOriginOpenerPolicy: false, // Désactive la politique COOP
    // referrerPolicy: { policy: "same-origin" },
  }),
);

// Canonical redirects: legacy aliases, missing lang prefix, trailing slashes
app.use(redirectMiddleware);

// Bot middleware: serves OG meta tags to social media crawlers
app.use(botMiddleware);

// Serve the admin frontend for admin.falcohmsystem.com
app.use("/", (req: Request, res: Response, next: Function) => {
  expressStaticGzip(path.join(__dirname, "build"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: (res: Response) => {
      res.setHeader("Cache-Control", "public, max-age=0");
    },
  })(req, res, next);
});

// app.set("trust proxy", true);
// to get the frontend routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Gestionnaire de middleware pour les routes non trouvées
app.use((_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({ error: "Route not found" });
});

declare module "express-serve-static-core" {
  interface Request {
    file_path: string;
    user_id: number;
    organization_name: string;
    organization_id: number;
    email: string;
  }
}

export { app };
// Setting the port for the backend server
if (process.env.NODE_ENV !== "test") {
  const PORT: number = 4001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
