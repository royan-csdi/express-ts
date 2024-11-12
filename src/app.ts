import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { checkHeader, loggingMiddleware } from "./middlewares";
import cors from "cors";
import loggerWinston from "./config/winston.config";

const app = express();
const port = 3030;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello Guys!");
// });

// app.get("/user/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.send(`user ${id}`);
// });

app.use(cors());
app.use(express.json());
// app.use(checkHeader);
// app.use(loggingMiddleware);
app.use(express.static("public"));
app.use((req: Request, res: Response, next: NextFunction) => {
  loggerWinston.info(`${req.method} ${req.url} - Winston`);

  next();
});
app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
