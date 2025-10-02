import Link from 'next/link'
import React from 'react'
import styles from './header.module.css'
import Navbar from './Navbar'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken'
import LogoutButton from './LogoutButton'

const Header = () => {

    const token = cookies().get('jwtToken')?.value || ''

    const payload = verifyTokenForPage(token)

    return (
        <header className={styles.header}>
            <Navbar payload={payload} />
            <div className={styles.right}>
                {
                    payload ? (
                        <>
                            <Link href={'/profile'} className='text-xl capitalize text-indigo-600 font-semibold'>
                                {payload?.username}
                            </Link>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link className={styles.btn} href='/login'>Login</Link>
                            <Link className={styles.btn} href='/register'>Register</Link>
                        </>
                    )
                }
            </div>
        </header>
    )
}

export default Header