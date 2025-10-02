import React from 'react'
import UpdateArticleButton from '../../UpdateArticleButton'
import { Article } from '@prisma/client'
import { getSingleArticle } from '@/apiCalle/ArticleApiCall'

// interface UpdateArticleProps {
//     articleId: string
//     title: string
//     description: string
// }
interface EditArticlePageProps {
    params: { id: string }
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {

    const article: Article = await getSingleArticle(params.id);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <UpdateArticleButton articleId={article.id.toString()} title={article.title} description={article.description} />
        </div>
    )
}

export default EditArticlePage