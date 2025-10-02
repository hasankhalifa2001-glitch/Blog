import { NextRequest, NextResponse } from "next/server";
import { verifyTokenForPage } from "./utils/verifyToken";


export async function middleware(request: NextRequest) {

    const jwtToken = request.cookies.get('jwtToken');
    const token = jwtToken?.value as string;
    const payload = verifyTokenForPage(token)

    if (!token) {
        if (
            request.nextUrl.pathname.startsWith("/api/users/profile/") ||
            request.nextUrl.pathname.startsWith("/admin") ||
            request.nextUrl.pathname.startsWith("/profile")
        ) {
            return NextResponse.json(
                { message: "no token provided, access denied, message from middleware" },
                { status: 401 } // Unauthorized
            )
        }
    } else {
        if (payload?.isAdmin == false) {
            return NextResponse.json(
                { message: "no token provided, access denied, message from middleware" },
                { status: 401 } // Unauthorized
            )
        } else if (
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register"
        ) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
}

export const config = {
    matcher: ["/api/users/profile/:path*", "/login", "/register", "/admin/",
        '/admin/articles-table', "/admin/comments-table", '/profile'
    ]
}