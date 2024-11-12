import { Article, Promo } from "@prisma/client";
import { prisma } from "../config";

const findAll = async () => {
  return prisma.article.findMany();
};

const findById = async (id: string) => {
  return prisma.article.findUnique({
    where: {
      id: id,
    },
    include: {
      articleTags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

const create = async (data: Omit<Article, "id">) => {
  return prisma.article.create({
    data,
  });
};

const update = async (id: string, data: Partial<Article>) => {
  return prisma.article.update({
    where: {
      id: id,
    },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.article.delete({
    where: {
      id,
    },
  });
};

type ArticleCreateData = Article & { tagIds?: string[] };
const createWithTags = async (data: Omit<ArticleCreateData, "id">) => {
  const { tagIds, ...restData } = data;
  return prisma.article.create({
    data: {
      ...restData,
      articleTags: {
        create: tagIds
          ? tagIds?.map((tagId) => ({
              tag: { connect: { id: tagId } },
            }))
          : [],
      },
    },
  });
};

const SArticle = {
  findAll,
  findById,
  create,
  update,
  remove,
  createWithTags,
};

export default SArticle;
