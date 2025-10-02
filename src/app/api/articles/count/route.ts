import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


/**
 *      @method GET
 *      @route http://localhost:3000/api/articles/count
 *      @description Get Article Count
 *      @access public  
*/


export async function GET(request: NextRequest) {
    try {

        const count = await prisma.article.count()

        return NextResponse.json(
            { count },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Article not found' },
            { status: 400 }
        )
    }
}
