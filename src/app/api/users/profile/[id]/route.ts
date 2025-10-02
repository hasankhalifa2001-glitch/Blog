import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWTPayload } from "@/utils/generateToken";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from 'bcryptjs'
import { UpdateUserSchema } from "@/utils/validationSchema";
import { cookies } from "next/headers";
import { CommentWithUserwithArticle, UserWithComment } from "@/utils/type";


interface Props {
    params: { id: string }
}

/**
 *      @method DELETE
 *      @route http://localhost:3000/api/users/profile/:id
 *      @description Delete Profile
 *      @access private  
*/


export async function DELETE(request: NextRequest, { params }: Props) {
    try {

        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            include: { comment: true },
        })
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }



        const userFromToken = verifyToken(request)

        if (userFromToken !== null && userFromToken.id === user.id) {
            await prisma.user.delete({ where: { id: parseInt(params.id) } })

            cookies().delete('jwtToken')

            const commentIds = user?.comment.map(com => com.id);

            await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });

            return NextResponse.json(
                { message: "User deleted" },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { message: "Only user himself delete his account, Forbidden" },
            { status: 403 } // forbidden
        )

    } catch (error) {
        NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}


/**
 *      @method GET
 *      @route http://localhost:3000/api/users/profile/:id
 *      @description Get Profile by id
 *      @access private  
*/

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                comment: {
                    select: {
                        id: true,
                        text: true,
                        createdAt: true,
                        articleId: true
                    }
                }
            },

        })
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        const userFromToken = verifyToken(request)
        // console.log(userFromToken)
        if (userFromToken === null) {
            return NextResponse.json(
                { message: "you are not allowed, access denied, user is null" },
                { status: 403 }
            )
        } else if (userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: "you are not allowed, access denied, id is not equal" },
                { status: 403 }
            )
        }

        const { password, ...other } = user

        return NextResponse.json({ ...other }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}



/**
 *      @method PUT
 *      @route http://localhost:3000/api/users/prfile/:id
 *      @description Update Profile by id
 *      @access private  
*/


export async function PUT(request: NextRequest, { params }: Props) {
    try {

        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } })
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        const userFromToken = verifyToken(request)
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: "you are not allowed, access denied" },
                { status: 403 }
            )
        }

        const body = await request.json() as UpdateUserDto

        const validation = UpdateUserSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        if (body.password) {

            const salt = await bcrypt.genSalt(10)
            body.password = await bcrypt.hash(body.password, salt)
        }

        const updateUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                email: body.email,
                username: body.username,
                password: body.password
            }
        })

        const { password, ...other } = updateUser

        return NextResponse.json(
            { ...other, message: "Update User Successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}