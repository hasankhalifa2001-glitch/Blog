"use client"

import axios from 'axios'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface DeleteProfileProps {
    userId: string
}

const DeleteProfilePage = ({ userId }: DeleteProfileProps) => {

    const router = useRouter()


    const DeleteProfileHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/users/profile/${userId}`)

            toast.success(res.data.message);
            router.replace('/')
            router.refresh()

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <button className='p-2 text-xl text-red-600 font-bold mt-5 underline' onClick={DeleteProfileHandler}>Delete my profile</button>
    )
}

export default DeleteProfilePage