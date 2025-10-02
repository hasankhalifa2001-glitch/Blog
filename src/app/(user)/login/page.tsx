import React from 'react'
import LoginForm from './LoginForm'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const LoginPage = () => {



    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div>
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
                <LoginForm />
                <div className='mt-4 text-center font-semibold leading-9 tracking-tight text-gray-900'>
                    Dont have on account? <Link className='text-indigo-600' href={'./register'}> Register</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage