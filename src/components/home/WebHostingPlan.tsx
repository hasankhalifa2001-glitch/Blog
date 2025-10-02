import React from 'react'
import { TiTick } from 'react-icons/ti'
import btn from '../header/header.module.css'

const WebHostingPlan = () => {
    return (
        <div className='flex flex-col items-center justify-center w-3/4 rounded-md p-4 bg-gray-200 mb-7 md:w-2/4 lg:w-1/4'>
            <div className='text-3xl font-semibold text-purple-900 '>
                Premium
            </div>
            <strong className='text-3xl font-semibold text-gray-900 my-5'>
                $4.99/mo
            </strong>
            <span className='bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold'>
                10% OFF
            </span>
            <div className='text-2xl mt-4 font-semibold text-purple-700'>
                Top Features
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center text-green-700 mb-1'>
                    100 Website<TiTick />
                </div>
                <div className='flex justify-between items-center text-green-700 mb-1'>
                    100 GB SSD Storge<TiTick />
                </div>
                <div className='flex justify-between items-center text-green-700 mb-1'>
                    Weekly Backups<TiTick />
                </div>
                <div className='flex justify-between items-center text-green-700 mb-1'>
                    Unlimited BandWidth<TiTick />
                </div>
                <div className='flex justify-between items-center text-green-700 mb-1'>
                    Free SLL<TiTick />
                </div>
                <div className='flex justify-between items-center text-green-700 mb-1'>
                    Free Email<TiTick />
                </div>
            </div>
            <button className={`${btn.btn} mt-3 mb-2`}>By Now</button>
        </div>
    )
}

export default WebHostingPlan