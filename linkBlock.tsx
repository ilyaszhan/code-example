'use client'

import Link from 'next/link'
import styles from './linkBlock.module.scss'
import AnimationScale from '@/components/animations/animationScale/animationScale'

interface LinkBlockProps {
    link: string,
    icon: JSX.Element,
    title: string
}

// Блок с ссылкой
const LinkBlock = ({ link, icon, title }: LinkBlockProps) => {
    return (
        <AnimationScale>
            <Link href={link} className={styles.link}>
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <div className={styles.icon}>
                            {icon}
                        </div>
                        <div className={styles.title}>{title}</div>
                    </div>
                </div>
            </Link>
        </AnimationScale>
    )
}

export default LinkBlock