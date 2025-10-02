"use client"
import Link from 'next/link'
import React from 'react'

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    return (
        <div className='text-center p-20'>
            <div className='text-red-600 font-semibold text-3xl'>
                SomeThing Went Error in Article Page
            </div>
            <div className='mt-8 font-semibold text-xl text-gray-700'>
                Error Message: {error.message}
            </div>
            <button
                onClick={() => reset()}
                className='py-2 px-3 m-8 bg-blue-600 hover:bg-blue-700 transition text-lg text-white rounded-md'
                style={{ transition: "0.3s" }}
            >Try Again</button>
            <Link href={'/'} className=' block text-lg font-medium'>Go To Home Page</Link>
        </div>
    )
}

export default ErrorPage