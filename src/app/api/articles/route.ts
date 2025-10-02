import prisma from "@/utils/db";
import { createArticleSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 *      @method GET
 *      @route http://localhost:3000/api/articles
 *      @description Get Articles by page number
 *      @access public  
*/

export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"

        const articlepage = 6

        const articles = await prisma.article.findMany({
            skip: articlepage * (parseInt(pageNumber) - 1),
            take: articlepage,
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(articles, { status: 200 })
    } catch (e) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}


/**
 *      @method POST
 *      @route http://localhost:3000/api/articles
 *      @description Create New Article
 *      @access public  
 */

export async function POST(request: NextRequest) {
    try {

        const user = verifyToken(request)

        if (user === null || user?.isAdmin === false) {
            return NextResponse.json(
                { message: "Only admin" },
                { status: 403 }
            );
        }

        const body = (await request.json()) as CreateArticleDto

        const validation = createArticleSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })


        return NextResponse.json(
            { message: "success", newArticle },
            { status: 201 }
        );
    } catch (e) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}