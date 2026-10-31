import { Request, Response } from "express";
import {
  createNews,
  deleteNews,
  getNewsById,
  getNewsList,
  updateNews,
} from "../services/news.service";
import {
  createNewsSchema,
  newsQuerySchema,
  updateNewsSchema,
} from "../validations/news.validation";
import { AppError } from "../utils/AppError";

const getAuthenticatedUserId = (req: Request) => {
  if (!req.user || typeof req.user.id !== "number") {
    throw new AppError("Thông tin người dùng không hợp lệ", 401);
  }
  return req.user.id;
};

const getNewsId = (req: Request) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    throw new AppError("ID tin tức không hợp lệ", 400);
  }
  return id;
};

export const listNews = async (req: Request, res: Response) => {
  const query = newsQuerySchema.parse(req.query);
  const data = await getNewsList(query);
  res.json({ data });
};

export const showNews = async (req: Request, res: Response) => {
  const data = await getNewsById(getNewsId(req));
  res.json({ data });
};

export const create = async (req: Request, res: Response) => {
  const input = createNewsSchema.parse(req.body);
  const data = await createNews(input, getAuthenticatedUserId(req));
  res.status(201).json({ message: "Tạo tin tức thành công", data });
};

export const update = async (req: Request, res: Response) => {
  const input = updateNewsSchema.parse(req.body);
  const data = await updateNews(
    getNewsId(req),
    input,
    getAuthenticatedUserId(req)
  );
  res.json({ message: "Cập nhật tin tức thành công", data });
};

export const remove = async (req: Request, res: Response) => {
  await deleteNews(getNewsId(req), getAuthenticatedUserId(req));
  res.json({ message: "Xóa tin tức thành công" });
};
