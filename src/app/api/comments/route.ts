import prisma from "@/utils/db";
import { createCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *      @method POST
 *      @route http://localhost:3000/api/comments
 *      @description Create a comment
 *      @access private
*/

export async function POST(request: NextRequest) {
    try {

        const user = verifyToken(request)

        if (!user) {
            return NextResponse.json(
                { message: "Only Logged in users, access denied" },
                { status: 401 }
            )
        }

        const body = await request.json() as CreateCommentDto
        const validation = createCommentSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id,
            }
        })

        return NextResponse.json(
            { newComment, message: "Created comment successfully" },
            { status: 201 }
        )

    } catch (e) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

/**
 *      @method GET
 *      @route http://localhost:3000/api/comments
 *      @description Get all comment
 *      @access private (Only Admin)
*/

export async function GET(request: NextRequest) {
    try {

        const user = verifyToken(request)

        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: "Only admin, access denied" },
                { status: 403 }
            )
        }

        const comment = await prisma.comment.findMany()
        return NextResponse.json(
            comment,
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}