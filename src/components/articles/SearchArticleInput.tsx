"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchArticleInput = () => {
    const [searchText, setSearchText] = useState('')
    const router = useRouter()

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/articles/search?searchText=${searchText}`)
    }


    return (
        <div className='pt-12 pb-5'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-xl ">
                <form onSubmit={formSubmitHandler} className="space-y-6" method="POST">
                    <div>
                        <div className="mt-2">
                            <input
                                type="search"
                                placeholder='Search for articles'
                                // autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchArticleInput