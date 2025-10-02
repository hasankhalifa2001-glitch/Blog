"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './header.module.css'
import axios from 'axios'
import { revalidatePath } from 'next/cache'


const LogoutButton = () => {

    const router = useRouter()

    const logoutHandler = async () => {
        try {
            axios.get(`http://localhost:3000/api/users/logout`)
            router.replace("/")
            router.refresh()
            revalidatePath('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={logoutHandler} className={styles.btn} >Logout</button>
    )
}

export default LogoutButton