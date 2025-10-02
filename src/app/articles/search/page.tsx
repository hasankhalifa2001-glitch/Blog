import { getArticleBasedOnSearch } from '@/apiCalle/ArticleApiCall'
import ArticleItem from '@/components/articles/ArticleItem'
import { Article } from '@prisma/client'
import React from 'react'

interface SearchArticleProps {
    searchParams: { searchText: string }
}

const SearchArticlePage = async ({ searchParams: { searchText } }: SearchArticleProps) => {
    const articles: Article[] = await getArticleBasedOnSearch(searchText)
    return (
        <section className='container m-auto px-5'>
            <div className='font-semibold text-2xl p-5'>
                Serach Text is: <span className='text-indigo-600'>{searchText}</span>
            </div>
            {articles.length > 0 ? (
                <div className='flex justify-center items-center flex-wrap mb-10 gap-5'>
                    {articles.map(article => (
                        <ArticleItem article={article} key={article.id} />
                    ))}
                </div>
            ) : <div className=' text-2xl p-5'>There are no articles start in {searchText}</div>}
        </section>
    )
}

export default SearchArticlePage