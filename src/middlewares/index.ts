import { RequestHandler, Request, Response, NextFunction } from "express";
import { formatResponse } from "../utils";
import env from "../config/env.config";
import { verifyToken } from "../utils/jwt";
import loggerWinston from "../config/winston.config";

const checkHeader: RequestHandler = (req, res, next) => {
  const contentType = req.headers["content-type"];
  const apiKey = req.headers["apikey"];
  //   X-Content-Type-Options:nosniff
  // X-XSS-Protection:1; mode=block
  // Strict-Transport-Security:max-age=31536000; includeSubDomains; preload
  // X-Frame-Options:SAMEORIGIN
  // Content-Type:application/json
  // APIKey:a4ea3746-89d6-4b72-a96e-52e3fdbadea1

  if (contentType !== "application/json") {
    res.status(400).json(formatResponse(400, "Invalid content type", null));
    return;
  }

  if (apiKey !== env.API_KEY) {
    res.status(401).json(formatResponse(401, "Unauthorized", null));
    return;
  }

  return next();
};

const loggingMiddleware: RequestHandler = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

const checkAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json(formatResponse(401, "Unauthorized"));
    return;
  }

  const verify = verifyToken(token, env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    if (verify === null) {
      res.status(403).json(formatResponse(403, "Token expired"));
      return;
    } else {
      res.status(401).json(formatResponse(401, "Unauthorized"));
      return;
    }
  }

  return next();
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  loggerWinston.error(`${statusCode} - ${message} - Winston`);
  res.status(statusCode).json(formatResponse(statusCode, message, null));
};

export { checkHeader, loggingMiddleware, checkAuth, errorHandler };
