import React from 'react'
import RegisterForm from './RegisterForm'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const RegisterPage = () => {


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div>
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new account</h2>
                <RegisterForm />
                <div className='mt-4 text-center font-semibold leading-9 tracking-tight text-gray-900'>
                    Already have on account? <Link className='text-indigo-600' href={'./login'}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage