import { UserWithComment } from "@/utils/type";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export async function getUserProfile(token: string): Promise<UserWithComment> {

    const payload = verifyTokenForPage(token)

    const response = await fetch(`http://localhost:3000/api/users/profile/${payload?.id}`, {
        headers: {
            Cookie: `jwtToken=${token}`
        }
    })

    return response.json()
}