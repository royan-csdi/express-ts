import { Car } from "@prisma/client";
import { prisma } from "../../config";

const findAll = async () => {
  return prisma.car
    .findMany
    // {
    //   include: {
    //     promo: true,
    //     articleTags: {
    //       include: {
    //         tag: true,
    //       },
    //     },
    //   },
    // }
    ();
};

const findById = async (id: string) => {
  return prisma.car.findUnique({
    where: {
      id,
    },
    include: {
      carBlogs: true,
    },
  });
};

const create = async (data: Omit<Car, "id">) => {
  return prisma.car.create({
    data,
  });
};

const update = async (id: string, data: Partial<Car>) => {
  return prisma.article.update({
    where: { id },
    data,
  });
};

type CarUpdateData = Partial<Car> & { blogIds?: string[] };
const updateWithTags = async (id: string, data: Partial<CarUpdateData>) => {
  const { blogIds, ...restData } = data;

  if (blogIds) {
    await prisma.carBlog.deleteMany({
      where: {
        carId: id,
      },
    });

    await prisma.carBlog.createMany({
      data: blogIds.map((blogId) => ({
        carId: id,
        blogId,
      })),
    });
  }

  return prisma.car.update({
    where: { id },
    data: restData,
  });
};

const remove = async (id: string) => {
  return prisma.article.delete({
    where: { id },
  });
};

type CarCreateData = Car & { blogIds?: string[] };
const createWithTags = async (data: Omit<CarCreateData, "id">) => {
  const { blogIds, ...restData } = data;
  return prisma.car.create({
    data: {
      ...restData,
      carBlogs: {
        create: blogIds
          ? blogIds.map((blogId) => ({
              blog: { connect: { id: blogId } },
            }))
          : [],
      },
    },
  });
};

const searchByTitle = async (title: string) => {
  return prisma.car.findMany({
    where: {
      name: {
        contains: title,
      },
    },
  });
};

const SCar = {
  findAll,
  findById,
  create,
  update,
  updateWithTags,
  remove,
  createWithTags,
  searchByTitle,
};

export default SCar;
