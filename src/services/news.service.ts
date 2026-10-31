import { ILike } from "typeorm";
import { AppDataSource } from "../config/db";
import { News } from "../entities/News";
import { AppError } from "../utils/AppError";
import {
  CreateNewsInput,
  NewsQuery,
  UpdateNewsInput,
} from "../validations/news.validation";

const getRepository = () => AppDataSource.getRepository(News);

export const getNewsList = async (query: NewsQuery) => {
  const { search, sortBy, order, page, limit } = query;
  const repository = getRepository();
  const where = search
    ? [{ title: ILike(`%${search}%`) }, { content: ILike(`%${search}%`) }]
    : undefined;

  const [items, total] = await repository.findAndCount({
    where,
    relations: { author: true },
    order: { [sortBy]: order.toUpperCase() as "ASC" | "DESC" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getNewsById = async (id: number) => {
  const news = await getRepository().findOne({
    where: { id },
    relations: { author: true },
  });

  if (!news) {
    throw new AppError("Không tìm thấy tin tức", 404);
  }

  return news;
};

export const createNews = async (input: CreateNewsInput, authorId: number) => {
  const news = getRepository().create({
    ...input,
    image: input.image ?? null,
    authorId,
  });

  return getRepository().save(news);
};

export const updateNews = async (
  id: number,
  input: UpdateNewsInput,
  userId: number
) => {
  const repository = getRepository();
  const news = await repository.findOneBy({ id });

  if (!news) {
    throw new AppError("Không tìm thấy tin tức", 404);
  }
  if (news.authorId !== userId) {
    throw new AppError("Bạn không có quyền sửa tin tức này", 403);
  }

  repository.merge(news, input);
  return repository.save(news);
};

export const deleteNews = async (id: number, userId: number) => {
  const repository = getRepository();
  const news = await repository.findOneBy({ id });

  if (!news) {
    throw new AppError("Không tìm thấy tin tức", 404);
  }
  if (news.authorId !== userId) {
    throw new AppError("Bạn không có quyền xóa tin tức này", 403);
  }

  await repository.remove(news);
};
