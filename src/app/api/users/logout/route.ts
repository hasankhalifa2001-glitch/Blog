import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


/**
 *      @method GET
 *      @route http://localhost:3000/api/users/logout
 *      @description logout user
 *      @access public  
*/


export async function GET(request: NextRequest) {
    try {
        cookies().delete("jwtToken")
        return NextResponse.json(
            { message: "logged out successfully" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}