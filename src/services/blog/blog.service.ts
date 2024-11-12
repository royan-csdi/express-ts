import { Blog, Tag } from "@prisma/client";
import { prisma } from "../../config";

const findAll = async () => {
  return prisma.blog.findMany();
};

const findById = async (id: string) => {
  return prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      carBlogs: true,
    },
  });
};

const create = async (data: Omit<Blog, "id">) => {
  return prisma.blog.create({
    data,
  });
};

const update = async (id: string, data: Partial<Blog>) => {
  return prisma.blog.update({
    where: {
      id,
    },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.blog.delete({
    where: {
      id,
    },
  });
};

const SBlog = {
  findAll,
  findById,
  create,
  update,
  remove,
};

export default SBlog;
