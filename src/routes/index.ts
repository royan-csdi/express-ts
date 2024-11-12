import { Router, Request, Response, NextFunction } from "express";
import { formatResponse } from "../utils";
import mathRouter from "./math.routes";
import authRouter from "./auth.routes";
import promoRouter from "./promo.routes";
import articleRouter from "./article.routes";
import tagRouter from "./tag.routes";
import carRouter from "./car.routes";
import blogRouter from "./blog.routes";
import iklanRouter from "./iklan.routes";
import {
  checkAuth,
  checkHeader,
  errorHandler,
  loggingMiddleware,
} from "../middlewares";
import loggerWinston from "../config/winston.config";

const router = Router();

router.get("/try", (req: Request, res: Response) => {
  res.send("try");
});

router.get("/about", checkAuth, (req: Request, res: Response) => {
  const url = req.url;
  res.json({
    message: `We in ${url}`,
  });
});

router.get("/user/:person", (req: Request, res: Response) => {
  const { person } = req.params;
  res.send(`user ${person}`);
});

router.get("/user/:id/posts", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `get user id: ${id} posts`,
  });
});

// TODO:
// GET /books - Retrieve all books
// POST /books - Add a new book
// PUT /books/:id - Update an existing book
// DELETE /books/:id - Delete a book

const books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];

// GET /books?author=George Orwell - Retrieve all books by author
router.get("/books/search", (req: Request, res: Response) => {
  const { author } = req.query;

  const filteredBooks = books.filter((b) =>
    b.author.includes(author as string)
  );

  if (filteredBooks.length > 0) {
    res.json(formatResponse(200, "success", filteredBooks));
  } else {
    res.json(formatResponse(404, "Book not found", null));
  }
});

// GET /books - Retrieve all books
router.get(
  "/books",
  //   checkHeader,
  //   loggingMiddleware,
  checkAuth,
  (req: Request, res: Response) => {
    res.json({
      status: 200,
      message: "success",
      data: books,
    });
  }
);

router.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;

  if (!title || !author) {
    res.status(400).json({
      status: 400,
      message: "title, author required",
      data: null,
    });
  }

  const newBook = {
    id: (books.length + 1).toString(),
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json({
    status: 201,
    message: "add book success",
    data: newBook,
  });
});

// PUT /books/:id - Update an existing book
router.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    res.json(formatResponse(404, "Book not found", null));
  } else {
    books[bookIndex] = {
      ...books[bookIndex],
      title: title,
      author: author,
    };
    res.json(formatResponse(200, "book updated", books[bookIndex]));
  }
});

// DELETE /books/:id - Delete a book
router.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    res.json(formatResponse(404, "Book not found", null));
  } else {
    books.splice(bookIndex, 1);
    res.json(formatResponse(200, "book deleted", null));
  }
});

// GET /books/:id - Retrieve a specific book
router.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(formatResponse(200, "Success", book));
  } else {
    res.json(formatResponse(404, "Book not found", null));
  }
});

router.use("/math", mathRouter);
router.use("/", authRouter);
router.use("/promos", promoRouter);
router.use("/articles", articleRouter);
router.use("/tags", tagRouter);
router.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    loggerWinston.info(
      `${req.method} ${req.originalUrl} - ${duration}ms - Winston`
    );
  });
  next();
});
router.use("/cars", carRouter);
router.use("/blogs", blogRouter);
router.use("/iklans", iklanRouter);
router.get("/try-error", (req: Request, res: Response) => {
  throw new Error("error coba");
});
router.use(errorHandler);

export default router;
