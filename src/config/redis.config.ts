import { createClient, SetOptions } from "redis";
import env from "./env.config";

const client = createClient({
  url: env.REDIS_URL,
});

client.connect();

const setValue = async (key: string, value: string, options?: SetOptions) => {
  return await client.set(key, value, options);
};

const getValue = async (key: string) => {
  return await client.get(key);
};

const deleteValue = async (key: string) => {
  return await client.del(key);
};

const redisClient = {
  setValue,
  getValue,
  deleteValue,
};

export default redisClient;
