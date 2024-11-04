import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title should be type string",
    })
    .min(2, { message: "Title should be at least 2 characters long" })
    .max(200),
  description: z.string().min(10),
});

export const registerSchema = z.object({
  username: z.string().min(2).max(200),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});

export const updateUserSchema = z.object({
  username: z.string().min(2).max(200).optional(),
  email: z.string().min(3).max(200).email().optional(),
  password: z.string().min(6).optional(),
});

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title should be type string",
    })
    .min(2, { message: "Title should be at least 2 caraters long" })
    .max(200, { message: "Title should be less than 200 caraters long" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description should be type string",
    })
    .min(4, { message: "Description should be at least 4 caraters long" }),
});
