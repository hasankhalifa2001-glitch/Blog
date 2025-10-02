import prisma from "@/utils/db";
import { registerNewUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { generateJWT, setCookie } from "@/utils/generateToken";


/**
 *      @method POST
 *      @route http://localhost:3000/api/users/register
 *      @description Create a new user
 *      @access public  
*/


export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as RegisterUserDto

        const validation = registerNewUserSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } })
        if (user) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)

        const newUser = await prisma.user.create(
            {
                data: {
                    email: body.email,
                    username: body.username,
                    password: hashedPassword
                }
            }
        )

        const jwtPayload = {
            id: newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        }

        const cookie = setCookie(jwtPayload)

        return NextResponse.json(
            { message: "User account has created", newUser },
            {
                status: 201,
                headers: { "set-cookie": cookie }
            }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}