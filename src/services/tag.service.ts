import { Tag } from "@prisma/client";
import { prisma } from "../config";

const findAll = async () => {
  return prisma.tag.findMany();
};

const findById = async (id: string) => {
  return prisma.tag.findUnique({
    where: {
      id: id,
    },
    include: {
      articleTags: {
        select: {
          article: {
            select: {
              title: true,
              content: true,
            },
          },
        },
      },
    },
  });
};

const create = async (data: Omit<Tag, "id">) => {
  return prisma.tag.create({
    data,
  });
};

const update = async (id: string, data: Partial<Tag>) => {
  return prisma.tag.update({
    where: {
      id: id,
    },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.tag.delete({
    where: {
      id,
    },
  });
};

const STag = {
  findAll,
  findById,
  create,
  update,
  remove,
};

export default STag;
