import { Request, Response } from "express";
import { formatResponse } from "../utils";
// import SArticle from "../services/article/article.service";
// import { redisClient } from "../config";
import SCar from "../services/car/car.service";
import redisClient from "../config/redis.config";
import loggerWinston from "../config/winston.config";
const CGetAllCars = async (req: Request, res: Response) => {
  try {
    const carsCache = await redisClient.getValue("cars");
    if (carsCache) {
      loggerWinston.info(`Redis - Winston`);
      res.json(formatResponse(200, "success", JSON.parse(carsCache)));
      return;
    }
    const cars = await SCar.findAll();
    await redisClient.setValue("cars", JSON.stringify(cars), {
      EX: 60 * 60 * 24, // one day
    });
    res.json(formatResponse(200, "Success", cars));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const CGetCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await SCar.findById(id);
    if (!car) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", car));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};

const CCreateCar = async (req: Request, res: Response) => {
  try {
    const newCar = await SCar.create(req.body);
    res.json(formatResponse(201, "Success", newCar));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const CUpdateCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCar = await SCar.update(id, req.body);
    if (!updatedCar) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update article" });
  }
};

const CUpdateCarWithTags = async (req: Request, res: Response) => {
  const { id } = req.params;
  const carData = req.body.data;
  try {
    const updatedCar = await SCar.updateWithTags(id, carData);
    res.json(formatResponse(200, "Success", updatedCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update article" });
  }
};

const CDeleteCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCar = await SCar.remove(id);
    if (!deletedCar) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete article" });
  }
};

const CCreateCarWithBlogs = async (req: Request, res: Response) => {
  const carData = req.body.data;
  try {
    const newCar = await SCar.createWithTags(carData);
    res.json(formatResponse(201, "Success", newCar));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create article" });
  }
};

const CSearchByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  try {
    const cars = await SCar.searchByTitle(title);
    res.json(formatResponse(200, "Success", cars));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};

export {
  CGetAllCars,
  CGetCarById,
  CCreateCar,
  CUpdateCar,
  CDeleteCar,
  CCreateCarWithBlogs,
  CUpdateCarWithTags,
  CSearchByTitle,
};
