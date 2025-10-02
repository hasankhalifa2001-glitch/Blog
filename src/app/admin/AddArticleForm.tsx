"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddArticleForm = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const router = useRouter()

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3000/api/articles`, { title, description })
            setTitle('')
            setDescription('')
            toast.success("Articles is Added")
            router.refresh()
        } catch (error: any) {
            toast.error(error?.response?.data.message)
        }
    }


    return (
        <div className=" sm:mx-auto sm:w-full sm:max-w-md lg:max-w-2xl p-4 shadow-lg border border-gray-300 rounded">
            <div className='text-gray-900 font-bold text-3xl text-center mb-12'>Add Your Article</div>
            <form onSubmit={formSubmitHandler} className="space-y-6" method="POST">
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full duration-300 justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Article
                    </button>
                </div>
            </form>
        </div>
    )
}


export default AddArticleForm