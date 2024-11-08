import fs from "fs";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import { readJSONFile, writeJSONFile } from "../utils";
import { IUser } from "../interfaces";
import { generateRefreshToken, generateToken, verifyToken } from "../utils/jwt";
import env from "../config/env.config";

let refreshTokens: string[] = [];

const usersFile = "users.json";

const register = async (username: string, password: string) => {
  const users = readJSONFile(usersFile);

  const existingUser = users.some((user: IUser) => user.username === username);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuid(),
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  writeJSONFile(usersFile, users);

  return {
    id: newUser.id,
    username: newUser.username,
  };
};

const login = async (username: string, password: string) => {
  const users = readJSONFile(usersFile);

  const user = users.find((user: IUser) => user.username === username);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }

  const accesToken = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  refreshTokens.push(refreshToken);

  return { accesToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  if (!refreshTokens.includes(refreshToken)) {
    throw new Error("Invalid refresh token");
  }

  const decodedToken = verifyToken(
    refreshToken,
    env.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const user = readJSONFile(usersFile).find(
    (user: IUser) => (user.id = decodedToken.userId)
  );

  if (!user) {
    throw new Error("User not found");
  }

  const accesToken = generateToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  refreshTokens.push(newRefreshToken);

  return {
    accesToken,
    refreshToken: newRefreshToken,
  };
};

const SAuth = {
  register,
  login,
  refreshToken,
};

export default SAuth;
