"use client"

import ButtonSpinner from '@/components/ButtonSpinner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const RegisterForm = () => {

    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:3000/api/users/register`, { username, email, password })
            setLoading(false)
            router.replace('/')
            router.refresh()
        } catch (error: any) {
            toast.error(error?.response?.data.message)
            setLoading(false)

        }
    }

    return (
        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formSubmitHandler} className="space-y-6" method="POST">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User name</label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder='Enter Your Name'
                            // autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder='Enter Your Email'
                            // autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder='Enter your password'
                            // autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full duration-300 justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? <ButtonSpinner /> : "Register"}

                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm