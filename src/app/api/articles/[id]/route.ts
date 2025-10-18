import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
}

/**
 *      @method GET
 *      @route http://localhost:3000/api/articles/:id
 *      @description Get Single Article by id
 *      @access public  
*/

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                comment: {
                    include: {
                        User: {
                            select: { username: true }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
        })
        if (!article) {
            return NextResponse.json(
                { message: 'Article not found' },
                { status: 400 }
            )
        }

        return NextResponse.json(article, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

/**
 *      @method PUT
 *      @route http://localhost:3000/api/articles/:id
 *      @description Update Article by id
 *      @access private  
*/

export async function PUT(request: NextRequest, { params }: Props) {
    try {

        const user = verifyToken(request)

        if (user === null || user?.isAdmin === false) {
            return NextResponse.json(
                { message: "Only admin" },
                { status: 403 }
            );
        }

        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } })
        if (!article) {
            return NextResponse.json(
                { message: 'Article not found' },
                { status: 400 }
            )
        }

        const body = await request.json() as UpdateArticleDto

        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json(
            { message: "Updated article", updatedArticle },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

/**
 *      @method DELETE
 *      @route http://localhost:3000/api/articles/:id
 *      @description Delete Article by id
 *      @access public  
*/

export async function DELETE(request: NextRequest, { params }: Props) {
    try {

        const user = verifyToken(request)

        if (user === null || user?.isAdmin === false) {
            return NextResponse.json(
                { message: "Only admin" },
                { status: 403 }
            );
        }

        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: { comment: true }
        })
        if (!article) {
            return NextResponse.json(
                { message: 'Article not found' },
                { status: 400 }
            )
        }

        // delete the article
        await prisma.article.delete({ where: { id: parseInt(params.id) } })

        // delete the comment that belongs to the article
        const commentIds: number[] = article?.comment.map(comment => comment.id)

        await prisma.comment.deleteMany({ where: { id: { in: commentIds } } })

        return NextResponse.json(
            { message: 'Article deleted successfully' },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}