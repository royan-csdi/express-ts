import express, { Request, Response } from "express";
import router from "./routes";
import { checkHeader, loggingMiddleware } from "./middlewares";

const app = express();
const port = 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello Guys!");
// });

// app.get("/user/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.send(`user ${id}`);
// });

app.use(express.json());
// app.use(checkHeader);
// app.use(loggingMiddleware);
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
