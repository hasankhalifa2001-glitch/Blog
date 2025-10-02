import prisma from "@/utils/db"
import { verifyToken } from "@/utils/verifyToken"
import { NextRequest, NextResponse } from "next/server"

interface Props {
    params: { id: string }
}

/**
 *      @method PUT
 *      @route http://localhost:3000/api/comments/:id
 *      @description Update comment 
 *      @access private (Only Owner of the Comment)
*/

export async function PUT(request: NextRequest, { params }: Props) {
    try {

        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) }
        })
        if (!comment) {
            return NextResponse.json(
                { message: "Comment not found" },
                { status: 404 }
            )
        }

        const user = verifyToken(request)
        if (user === null || user.id !== comment.userId) {
            return NextResponse.json(
                { message: "your are not allowed, access denied" },
                { status: 403 } // unauthorized
            )
        }


        const body = await request.json() as UpdateCommentDto



        const updateComment = await prisma.comment.update({
            where: { id: parseInt(params.id) },
            data: { text: body.text }
        })

        return NextResponse.json(
            { message: 'Comment updated successfully', updateComment },
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
 *      @route http://localhost:3000/api/comments/:id
 *      @description Delete comment 
 *      @access private (Only Admin or Owner of the Comment)
*/

export async function DELETE(request: NextRequest, { params }: Props) {
    try {

        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) }
        })
        if (!comment) {
            return NextResponse.json(
                { message: "Comment not found" },
                { status: 404 }
            )
        }

        const user = verifyToken(request)

        if (user === null) {
            return NextResponse.json(
                { message: "No Token Provide, access denied" },
                { status: 401 } // unauthorized
            )
        }

        if (user.isAdmin || user.id === comment.userId) {
            await prisma.comment.delete({
                where: { id: parseInt(params.id) }
            })
            return NextResponse.json(
                { message: 'Comment deleted' },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { message: 'You are not allowed to delete this comment' },
            { status: 403 } // unauthorized
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}