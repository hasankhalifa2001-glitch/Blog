import { getArticle, getArticleCount } from '@/apiCalle/ArticleApiCall'
import Pagination from '@/components/articles/Pagination'
import { Article } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import DeleteArticleButton from './DeleteArticleButton'
import prisma from '@/utils/db'

const head = ["Title", "Created At", "Actions", "Details"]

interface AdminArticlesTableProps {
    searchParams: { pageNumber: string }
}

const AdminArticlesTable = async ({ searchParams: { pageNumber } }: AdminArticlesTableProps) => {

    const articles: Article[] = await getArticle(pageNumber)

    const count = await prisma.article.count()

    const arr: number[] = []

    const pages = Math.ceil(count / 6)
    for (let i = 1; i <= pages; i++) arr.push(i)


    return (
        <section className='p-5 bg-gray-100 height w-full'>
            <div className='mb-4'>Articles</div>
            <div className='table shadow-md w-full bg-gray-50 rounded-lg border mb-20 border-solid border-gray-300'>
                <div className='table-header-group'>
                    <div className='table-row font-bold '>
                        {head.map((item, index) => (
                            <div key={index} className='table-cell'>
                                <div className='m-4 ml-0  border-l border-l-slate-300 pl-4'>
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='table-row-group'>
                    {articles.map(article => (
                        <div className='table-row bg-white overflow-hidden' key={article.id}>
                            <div className='table-cell text-slate-800 bg-white p-4 rounded-bl-lg border-t font-bold'>{article.title}</div>
                            <div className='table-cell text-slate-400 bg-white p-4 border-t font-semibold'>{new Date(article.createdAt).toDateString()}</div>
                            <div className='table-cell text-slate-400 bg-white p-4 border-t font-semibold'>
                                <DeleteArticleButton articleId={article.id} /> <Link href={`/admin/articles-table/edit/${article.id}`} className='text-indigo-600'>Edit</Link>
                            </div>
                            <div
                                className='table-cell text-slate-400 bg-white p-4 rounded-br-lg border-t font-semibold'
                            >
                                <Link href={`/articles/${article.id}`}>Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination pages={pages} color='bg-gray-100' route='/admin/articles-table' pageNumber={parseInt(pageNumber)} />

        </section>
    )
}

export default AdminArticlesTable