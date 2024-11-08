import { Request, Response } from "express";
import {
  formatResponse,
  logHistory,
  readJSONFile,
  writeJSONFile,
} from "../utils";
import { SMathOperation } from "../services/math.service";

const CListOperations = (req: Request, res: Response): void => {
  const operations = ["add", "subtract", "multiply", "divide"];
  res.json(formatResponse(200, "Success", operations));
};
const CMathOperations = (req: Request, res: Response): void => {
  const { valueA, valueB, operation } =
    req.method === "POST"
      ? req.body
      : {
          valueA: req.query.valueA || req.params.valueA,
          valueB: req.query.valueB || req.params.valueB,
          operation: req.query.operation || req.params.operation,
        };

  const numA = parseFloat(valueA as string);
  const numB = parseFloat(valueB as string);

  try {
    const result = SMathOperation(numA, numB, operation as string);

    if (result !== null) {
      logHistory(operation as string, numA, numB, result);
      res.json(
        formatResponse(200, "Success", {
          valueA: numA,
          valueB: numB,
          operation: operation,
          result: result,
        })
      );
    } else {
      res
        .status(400)
        .json(formatResponse(400, "Division by zero is not allowed"));
    }
  } catch (error: any) {
    res.status(400).json(formatResponse(400, error.message));
  }
};

const CGetHistory = (req: Request, res: Response): void => {
  const data = readJSONFile("history.json");
  res.json(formatResponse(200, "Success", data));
};

const CRemoveByIndex = (req: Request, res: Response): void => {
  const { index } = req.params;
  const data = readJSONFile("history.json");
  if (Number(index) >= 0 && Number(index) < data.length) {
    data.splice(Number(index), 1);
  } else {
    res.status(400).json(formatResponse(400, "Index out of bounds"));
    return;
  }
  writeJSONFile("history.json", data);
  res.json(formatResponse(200, "Success", data));
};

export { CListOperations, CMathOperations, CGetHistory, CRemoveByIndex };
