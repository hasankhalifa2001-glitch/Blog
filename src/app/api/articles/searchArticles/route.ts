import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


/**
 *      @method GET
 *      @route http://localhost:3000/api/articles/searchArticles?searchText=value
 *      @description Get Article by search text
 *      @access public  
*/

export async function GET(request: NextRequest) {
    try {

        const searchText = request.nextUrl.searchParams.get("searchText");

        let articles;

        if (searchText) {
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        startsWith: searchText,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            articles = await prisma.article.findMany({ take: 6 })
        }

        return NextResponse.json(articles, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: 'Article not found' },
            { status: 400 }
        )
    }
}