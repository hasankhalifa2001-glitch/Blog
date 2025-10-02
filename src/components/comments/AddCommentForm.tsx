"use client"
import React, { useState } from 'react'
import styles from '../header/header.module.css'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AddCommentFormProps {
    articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {

    const [text, setText] = useState('')

    const router = useRouter()

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3000/api/comments`, { text, articleId })
            router.refresh()
            setText('')
        } catch (error: any) {
            toast.error(error?.response?.data.message)
        }

    }
    return (
        <div className='pt-12 pb-5'>
            <div className="sm:mx-auto sm:w-full ">
                <form onSubmit={formSubmitHandler} className=" flex items-center justify-between gap-5" method="POST">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder='Add a text'
                            required
                            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button type='submit' className={`${styles.btn} `}>
                        Comment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCommentForm