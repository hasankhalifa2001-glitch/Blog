import { getComments } from '@/apiCalle/adminApiCall'
import { Comment } from '@prisma/client'
import { cookies } from 'next/headers'
import React from 'react'
import DeleteCommentButton from './DeleteCommentButton'

const head = ["Comment", "Created At", "Actions"]


const AdminCommentsPage = async () => {

    const token = cookies().get("jwtToken")?.value

    const comments: Comment[] = await getComments(token)
    return (
        <section className='p-5 bg-gray-100 height w-full'>
            <div className='mb-4'>Comment Table</div>
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
                    {comments.map(comment => (
                        <div className='table-row bg-white overflow-hidden' key={comment.id}>
                            <div className='table-cell text-slate-800 bg-white p-4 rounded-bl-lg border-t font-bold'>{comment.text}</div>
                            <div className='table-cell text-slate-400 bg-white p-4 border-t font-semibold'>{new Date(comment.createdAt).toDateString()}</div>
                            <div className='table-cell text-slate-400 bg-white p-4 border-t font-semibold'>
                                <DeleteCommentButton commentId={comment.id} />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AdminCommentsPage