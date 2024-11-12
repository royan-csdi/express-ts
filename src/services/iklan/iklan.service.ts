import { Iklan, Promo } from "@prisma/client";
import { prisma } from "../../config";

const findAll = async () => {
  return prisma.iklan.findMany();
};

const findById = async (id: string) => {
  return prisma.iklan.findUnique({
    where: {
      id,
    },
    include: {
      cars: true,
    },
  });
};

const create = async (data: Omit<Iklan, "id">) => {
  return prisma.iklan.create({
    data,
  });
};

const update = async (id: string, data: Partial<Iklan>) => {
  return prisma.iklan.update({
    where: { id },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.iklan.delete({
    where: { id },
  });
};

const SIklan = {
  findAll,
  findById,
  create,
  update,
  remove,
};

export default SIklan;
