"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface UpdateArticleProps {
    articleId: string
    title: string
    description: string
}

const UpdateArticleButton = ({ articleId, title, description }: UpdateArticleProps) => {

    const [updateTitle, setUpdateTitle] = useState(title)
    const [updateDescription, setUpdateDescription] = useState(description)

    const router = useRouter()

    const updateFormSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:3000/api/articles/${articleId}`,
                { title: updateTitle, description: updateDescription })
            setUpdateTitle('')
            setUpdateDescription('')
            toast.success("Articles is Updating")
            router.refresh()
        } catch (error: any) {
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-2xl p-4 shadow-lg border border-gray-300 rounded">
            <div className='text-gray-900 font-bold text-3xl text-center mb-12'>Update Your Article</div>
            <form onSubmit={updateFormSubmitHandler} className="space-y-6" method="POST">
                <div>
                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">Article Title</label>
                    <div className="mt-2">
                        <input
                            id="text"
                            name="text"
                            type="text"
                            placeholder='Enter Article Title'
                            // autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={updateTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="textarea" className="block text-sm font-medium leading-6 text-gray-900">Article Description</label>
                    <div className="mt-2">
                        <textarea
                            id="textarea"
                            name="textarea"
                            rows={5}
                            placeholder='Enter Article Description'
                            // autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={updateDescription}
                            onChange={(e) => setUpdateDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full duration-300 justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Update Article
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateArticleButton