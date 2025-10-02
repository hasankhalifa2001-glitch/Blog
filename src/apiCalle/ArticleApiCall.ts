import { SingleArticle } from "@/utils/type"
import { Article, Comment } from "@prisma/client"

// Get Articles based on page number
export async function getArticle(pageNumber: string | undefined): Promise<Article[]> {

    const response = await fetch(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`, {
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error("Failed to Fetch Articles")
    }

    return response.json()

}

// Get articles count
export async function getArticleCount(): Promise<number> {

    const response = await fetch(`http://localhost:3000/api/articles/count`, {
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error("Failed to Get Articles Count")
    }

    const { count } = await response.json()

    return count

}

// Get Articles based on searchtext
export async function getArticleBasedOnSearch(searchText: string): Promise<Article[]> {

    const response = await fetch(`http://localhost:3000/api/articles/searchArticles?searchText=${searchText}`,
        { cache: "no-store" }
    )

    if (!response.ok) {
        throw new Error("Failed to Fetch Articles")
    }

    return response.json()

}


// Get single article
export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
    const response = await fetch(`http://localhost:3000/api/articles/${articleId}`,
        { cache: "no-store" }
    )
    if (!response.ok) {
        throw new Error("Error fetching article")
    }
    return response.json()
}


