"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DeleteArticleProps {
    articleId: number
}

const DeleteArticleButton = ({ articleId }: DeleteArticleProps) => {

    const router = useRouter()

    const deleteArticleHandler = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/articles/${articleId}`)
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={deleteArticleHandler} className='text-red-700'>Delete</button>
    )
}

export default DeleteArticleButton