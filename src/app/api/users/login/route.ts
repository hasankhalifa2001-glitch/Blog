import prisma from "@/utils/db";
import { loginUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { setCookie } from "@/utils/generateToken";
import { serialize } from "cookie";


/**
 *      @method POST
 *      @route http://localhost:3000/api/users/login
 *      @description login user
 *      @access public  
*/

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto

        const validation = loginUserSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } })
        if (!user) {
            return NextResponse.json(
                { message: "invalid user or password" },
                { status: 400 }
            )
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password)
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "invalid user or password" },
                { status: 400 }
            )
        }

        const jwtPayload = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        }

        const cookie = setCookie(jwtPayload)

        return NextResponse.json(
            { message: "login successful" },
            {
                status: 200,
                headers: { 'Set-Cookie': cookie }

            }
        )


    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
