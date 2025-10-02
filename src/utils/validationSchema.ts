import { z } from "zod";


export const createArticleSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "The Title must be of type string"
    }).min(2).max(20),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "The Description must be of type string"
    }).min(5).max(50),
})

export const registerNewUserSchema = z.object({
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "The Username must be of type string"
    }).min(5).max(30),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "The Email must be of type string"
    }).min(5).max(30).email(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "The Password must be of type string"
    }).min(6).max(30)
})

export const UpdateUserSchema = z.object({
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "The Username must be of type string"
    }).min(5, { message: 'Username must contain at least 5 characters' }).max(30).optional(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "The Email must be of type string"
    }).min(5).max(30).email().optional(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "The Password must be of type string"
    }).min(6).max(30).optional()
})

export const loginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "The Email must be of type string"
    }).min(5).max(30).email(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "The Password must be of type string"
    }).min(6).max(30)
})

export const createCommentSchema = z.object({
    text: z.string({
        required_error: "Text is required",
        invalid_type_error: "The Text must be of type string"
    }).min(2).max(300),
    articleId: z.number({
        required_error: "Id is required",
        invalid_type_error: "The Id must be of type Number"
    })
})