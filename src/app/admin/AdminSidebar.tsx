"use client"

import Link from 'next/link'
import React from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { usePathname } from 'next/navigation';



const AdminSidebar = () => {

    const pathname = usePathname()

    return (
        <>
            <Link
                href={'/admin'}
                className={` text-gray-700 mb-4 duration-300 py-2 px-2 rounded-md flex items-center gap-2 
                    hover:text-indigo-600 hover:bg-slate-50  ${pathname === '/admin' ? `bg-slate-50 text-indigo-600` : ``}`}
            >
                {<AiOutlineHome className='text-2xl' />}
                <div className='lg:block hidden'>Dashboard</div>
            </Link>
            <Link
                href={'/admin/articles-table?pageNumber=1'}
                className={`text-gray-700 mb-4 duration-300 py-2 px-2 rounded-md flex items-center gap-2
                    hover:text-indigo-600 hover:bg-slate-50 ${pathname === '/admin/articles-table' ? `bg-slate-50 text-indigo-600` : ``}`}
            >
                <MdOutlineArticle className='text-2xl text-gray-500' />
                <div className='lg:block hidden'>Articles</div>
            </Link>
            <Link
                href={'/admin/comments-table'}
                className={`text-gray-700 py-2 px-2 duration-300 rounded-md flex items-center gap-2
                    hover:text-indigo-600 hover:bg-slate-50 ${pathname === '/admin/comments-table' ? `bg-slate-50 text-indigo-600` : ``}`}
            >
                <FaRegComments className='text-2xl text-gray-500' />
                <div className='lg:block hidden'>Comments</div>
            </Link>
        </>
    )
}

export default AdminSidebar