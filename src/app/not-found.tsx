import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <section className='text-center p-4 flex flex-col items-center justify-center gap-6'>
            <div className={`font-bold mt-20 text-fuchsia-900 oops`}>Oops!</div>
            <div className='text-xl font-bold'>404 - Page Not Found</div>
            <p className='text-sm w-80 font-semibold text-gray-600'>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
            <Link className='bg-indigo-600 hover:bg-indigo-500 duration-300 px-5 py-2 font-semibold w-fit uppercase text-white rounded-full' href={'/'}>Go To Home Page</Link>
        </section>
    )
}

export default NotFoundPage