"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

interface CommentParamsProps {
    commentId: number
}

const DeleteCommentButton = ({ commentId }: CommentParamsProps) => {

    const router = useRouter()

    const deleteCommentHandler = () => {
        try {
            axios.delete(`http://localhost:3000/api/comments/${commentId}`)
            router.refresh()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={deleteCommentHandler}>Delete</button>
    )
}

export default DeleteCommentButton