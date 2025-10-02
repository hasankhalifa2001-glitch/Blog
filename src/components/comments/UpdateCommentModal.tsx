"use client"
import React, { FormEvent, useState } from 'react'
import styles from '../header/header.module.css'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

interface UpdateCommentProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    text: string
    commentId: number
}

const UpdateCommentModal = ({ setOpen, text, commentId }: UpdateCommentProps) => {

    const [updateText, setUpdateText] = useState(text)

    const router = useRouter()

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (updateText === '') return toast.error('Please write anything')

        try {
            const res = await axios.put(`http://localhost:3000/api/comments/${commentId}`, { text: updateText })
            router.refresh()
            setOpen(false)
        } catch (error: any) {
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <div className=' fixed duration-1000 top-0 left-0 right-0 bottom-0 bg-black z-10 flex justify-center items-center bg-opacity-70'>
            <div className='w-2/4 rounded-lg bg-white p-5 '>
                <div className='flex justify-end items-start'>
                    <IoMdCloseCircleOutline className='text-xl' onClick={() => setOpen(false)} />
                </div>
                <form onSubmit={formSubmitHandler}>
                    <input
                        type="text"
                        placeholder='Edit'
                        className='text-xl rounded-md outline-none w-full bg-white my-3 px-2 py-1.5 block shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                    />
                    <button type='submit' className={styles.btn}>Update Comment</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCommentModal