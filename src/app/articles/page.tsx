import ArticleItem from '@/components/articles/ArticleItem'
import React from 'react'
import SearchArticleInput from '@/components/articles/SearchArticleInput'
import Pagination from '@/components/articles/Pagination'
import { Article } from '@prisma/client'
import { getArticle, getArticleCount } from '@/apiCalle/ArticleApiCall'
import prisma from '@/utils/db'

interface ArticlePageProps {
    searchParams: { pageNumber: string }
}

const Articles = async ({ searchParams }: ArticlePageProps) => {

    const { pageNumber } = searchParams;

    const articles: Article[] = await getArticle(pageNumber)

    const count = await prisma.article.count()

    const pages = Math.ceil(count / 6)

    return (
        <section className='container m-auto px-5'>
            <SearchArticleInput />
            <div className='flex justify-center items-center flex-wrap mb-10 gap-5'>
                {articles.map(article => (
                    <ArticleItem article={article} key={article.id} />
                ))}
            </div>
            <Pagination pageNumber={parseInt(pageNumber)} color='bg-white' pages={pages} route='/articles' />
        </section>
    )
}

export default Articles