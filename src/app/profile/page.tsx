import { getUserProfile } from '@/apiCalle/profileApiCall'
import { verifyTokenForPage } from '@/utils/verifyToken'
import { User } from '@prisma/client'
import { cookies } from 'next/headers'
import React from 'react'
import UpdateProfilePage from './UpdateProfile'
import DeleteProfilePage from './DeleteProfile'
import { CommentWithUserwithArticle, UserWithComment } from '@/utils/type'

const ProfilePage = async () => {

    const token = cookies().get('jwtToken')?.value as string

    const user = await getUserProfile(token)

    console.log(user)

    return (
        <section className='w-full p-5'>
            <div
                className='text-center mb-5 text-indigo-600 font-bold text-3xl border-b-2 p-3 border-indigo-600 w-fit mx-auto'
            >
                Profile Page
            </div>
            <div className='flex '>
                <div className='w-1/2 mx-auto flex flex-col justify-center items-center'>
                    <div className='text-2xl text-indigo-600 font-semibold mb-10'>Update Your Profile</div>
                    <UpdateProfilePage user={user} token={token} />
                </div>
                <hr />
                <div className='w-1/2 mx-auto flex flex-col justify-center items-center text-gray-800'>
                    <div>
                        <div className='p-2 text-xl mb-2'>User Name : <span className='text-indigo-600'>{user.username}</span></div>
                        <div className='p-2 text-xl mb-2'>Email : <span className='text-indigo-600'>{user.email}</span></div>
                        <div className='p-2 text-xl mb-2'>Create At : <span className='text-indigo-600'>{new Date(user.createdAt).toDateString()}</span></div>
                        <div className='p-2 text-xl mb-2'>Update At : <span className='text-indigo-600'>{new Date(user.updatedAt).toDateString()}</span></div>
                        <DeleteProfilePage userId={user.id.toString()} />
                    </div>
                </div>
            </div>
            <div
                className='text-center my-5 text-indigo-600 font-bold text-3xl border-b-2 p-3 border-indigo-600 w-fit mx-auto'
            >
                Comment
            </div>
            <div>
                {
                    user.comment.map(comment => (
                        <div key={comment.id} className='w-full'>
                            <div>{comment.text}</div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default ProfilePage