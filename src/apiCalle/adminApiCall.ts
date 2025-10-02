import { Comment } from "@prisma/client";

// Get Comments 
export async function getComments(token: string | undefined): Promise<Comment[]> {

    const response = await fetch(`http://localhost:3000/api/comments`, {
        headers: {
            Cookie: `jwtToken=${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to Fetch Comment")
    }

    return response.json()
}