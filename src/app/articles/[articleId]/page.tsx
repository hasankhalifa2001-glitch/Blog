import AddCommentForm from '@/components/comments/AddCommentForm'
import CommentItem from '@/components/comments/CommentItem'
import prisma from '@/utils/db'
import { SingleArticle } from '@/utils/type'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { cookies } from 'next/headers'
import React from 'react'

interface ArticleId {
    params: { articleId: string }
}

export const dynamic = 'force-dynamic';

const ArticleIdPage = async ({ params }: ArticleId) => {


    const token = cookies().get('jwtToken')?.value || ''
    const payload = verifyTokenForPage(token)

    const id = Number(params.articleId)
    if (isNaN(id)) {
        return <div>Invalid article ID</div>
    }

    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            comment: {
                include: {
                    User: { select: { username: true } }
                },
                orderBy: { createdAt: 'desc' }
            }
        },
    }) as SingleArticle

    if (!article) {
        return <div className="text-center py-10 text-red-500">Article not found.</div>
    }

    return (
        <section className='container m-auto w-full md:w-3/4 lg:w-2/3 xl:w-7/12 pt-8 px-5'>
            <div className='flex justify-center flex-col bg-gray-50 border p-7 rounded-lg'>
                <div className='font-bold text-2xl mb-2 text-gray-800'>
                    {article.title}
                </div>
                <div className='text-gray-400 mb-5 font-semibold'>
                    {new Date(article.createdAt).toDateString()}
                </div>
                <div className='text-gray-700'>
                    {article.description}
                </div>
            </div>
            {token && <AddCommentForm articleId={article.id} />}
            <div className='font-semibold text-xl p-5'>Comment</div>
            {article.comment.map(comment => (
                <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
            ))}

        </section>
    )
}

export default ArticleIdPage