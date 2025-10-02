"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import styles from './header.module.css'
import { GrTechnology } from 'react-icons/gr'
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { JWTPayload } from '@/utils/generateToken';


interface PayloadProps {
    payload: JWTPayload | null
}


const Navbar = ({ payload }: PayloadProps) => {
    const [toggle, setToggle] = useState(false);

    const pathname = usePathname()

    const navLinks = [
        { name: "Home", href: '/' },
        { name: "About", href: '/about' },
        { name: "Articles", href: '/articles?pageNumber=1' },
    ]

    return (
        <nav className={styles.navbar}>
            <div>
                <Link href='/' className={styles.logo}>
                    CLOUD
                    <GrTechnology />
                    HOSTING
                </Link>
                <div className={styles.menu} onClick={() => setToggle((perv) => !perv)}>
                    {toggle ? <IoClose /> : <RiMenu2Fill />}
                </div>
            </div>
            <div
                className={styles.navLinksWarpper}
                style={{ clipPath: toggle ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : '' }}
            >
                <div className={styles.navLinks}>

                    {navLinks.map((link) => {

                        return (
                            <Link
                                href={link.href}
                                key={link.name}
                                className={`${styles.navLink} ${pathname === link.href ? `bg-indigo-600 text-white hover:bg-indigo-900 ${styles.linkactive}` : ''}`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                    {payload?.isAdmin && <Link
                        className={`${styles.navLink} ${pathname === '/admin' ? `bg-indigo-600 text-white hover:bg-indigo-900 ${styles.linkactive}` : ''}`}
                        href={'/admin'}
                    >
                        Admin
                    </Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar