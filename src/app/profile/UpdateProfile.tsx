"use client"
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface UserProps {
    user: User
    token: string
}

const UpdateProfilePage = ({ user, token }: UserProps) => {


    const [updateUsername, setUpdateUsername] = useState(user.username)
    const [updateEmail, setUpdateEmail] = useState(user.email)
    const [updatePassword, setUpdatePassword] = useState(user.password)



    const router = useRouter()

    const updateProfileHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:3000/api/users/profile/${user.id}`,
                {
                    username: updateUsername,
                    email: updateEmail,
                    password: updatePassword
                },
            )
            toast.success(res.data.message);
            router.replace('/')
            router.refresh()
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <form className="space-y-6 w-1/2">
            <div className=''>
                <label htmlFor="username">User Name</label>
                <div className='mt-2'>
                    <input
                        type="text"
                        name='username'
                        id='username'
                        placeholder='User Name'
                        className='w-full outline-none py-1.5 px-2 border-0 shadow-sm rounded-md 
                                    ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={updateUsername}
                        onChange={(e) => setUpdateUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className='mb-5'>
                <label htmlFor="email">Email</label>
                <div className='mt-2'>
                    <input
                        type="text"
                        id='email'
                        placeholder='Email'
                        className='w-full outline-none py-1.5 px-2 border-0 shadow-sm rounded-md 
                                    ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='mb-5'>
                <label htmlFor="password" className='text-gray-900'>Password</label>
                <div className='mt-2'>
                    <input
                        type="password"
                        id='password'
                        placeholder='Password'
                        className='w-full outline-none text-gray-900 py-1.5 px-2 border-0 shadow-sm 
                                    rounded-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={updatePassword}
                        onChange={(e) => setUpdatePassword(e.target.value)}
                    />
                </div>
            </div>
            <button
                className='border-2 border-indigo-600 text-indigo-600 rounded py-1 px-2.5 font-semibold
                        hover:bg-indigo-600 hover:text-white duration-300'
                onClick={updateProfileHandler}
            >
                Update
            </button>
        </form>
    )
}

export default UpdateProfilePage