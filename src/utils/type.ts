import { Article, Comment, User } from "@prisma/client";


export type JWTPayload = {
    id: string;
    username: string;
    isAdmin: boolean;
}

export type CommentWithUser = Comment & { User: User }

export type SingleArticle = Article & { comment: CommentWithUser[] }


export type UserWithComment = User & { comment: Comment[] }

export type CommentWithUserwithArticle = UserWithComment & { Article: Article }
