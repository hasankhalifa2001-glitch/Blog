import Image from 'next/image'
import React from 'react'
import { TiTick } from 'react-icons/ti'
import CloudHosting from '../../../public/cloud-hosting.png'
import home from './home.module.css'

const Hero = () => {
    return (
        <div className={home.hero}>
            <div>
                <div className={home.title}>Cloud Hosting</div>
                <p className={home.desc}>
                    The best web hosting solution for your online success
                </p>
                <div className={home.service}>
                    Esay to use control panel <TiTick />
                </div>
                <div className={home.service}>
                    Secure Hosting <TiTick />
                </div>
                <div className={home.service}>
                    Website Maintenance <TiTick />
                </div>
            </div>
            <div>
                <Image src={CloudHosting} alt='Cloud Hosting' width={500} height={500} />
            </div>
        </div>
    )
}

export default Hero