"use client"
import { CommentWithUser } from '@/utils/type'
import React, { useState } from 'react'
import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import UpdateCommentModal from './UpdateCommentModal'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface CommentItemProps {
    comment: CommentWithUser
    userId: number | undefined
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {

    const [open, setOpen] = useState(false);
    const router = useRouter()

    const DeleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/comments/${comment.id}`)
            router.refresh()
        } catch (error: any) {
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <div className='border border-slate-300 rounded p-5 bg-slate-50 mb-5'>
            <div className='flex justify-between mb-5'>
                <div className='font-bold text-2xl'>
                    {comment.User.username}
                </div>
                <div className='text-stone-500 font-semibold'>
                    {new Date(comment.createdAt).toDateString()}
                </div>
            </div>
            <p className='text-slate-400'>{comment.text}</p>
            {comment.userId === userId &&
                <div className='flex justify-end gap-5'>
                    <FiEdit3 onClick={() => setOpen(true)} className='text-xl text-green-600 cursor-pointer' />
                    <FiTrash2 onClick={DeleteHandler} className='text-xl text-rose-700 cursor-pointer' />
                </div>
            }
            {open &&
                <UpdateCommentModal
                    setOpen={setOpen}
                    text={comment.text}
                    commentId={comment.id}
                />
            }
        </div>
    )
}

export default CommentItem