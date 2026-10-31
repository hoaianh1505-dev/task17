import { z } from "zod";

export const createNewsSchema = z.object({
  title: z.string().trim().min(5, "Tiêu đề ít nhất 5 ký tự"),
  content: z.string().trim().min(10, "Nội dung ít nhất 10 ký tự"),
  image: z.string().trim().optional(),
});

export const updateNewsSchema = createNewsSchema.partial();

export const newsQuerySchema = z.object({
  search: z.string().trim().optional(),
  sortBy: z.enum(["createdAt", "title", "updatedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
export type NewsQuery = z.infer<typeof newsQuerySchema>;
