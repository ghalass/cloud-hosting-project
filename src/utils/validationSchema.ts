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
