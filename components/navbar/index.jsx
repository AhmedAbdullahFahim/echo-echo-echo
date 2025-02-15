'use client'
import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import logo from '@/assets/images/rdi-logo.webp'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const navItems = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Echo',
      href: '/echo',
    },
  ]
  console.log('pathname', pathname)

  return (
    <nav className={styles.nav}>
      <Image src={logo} width={150} height={50} alt='logo' />
      <ul>
        {navItems.map((item) => (
          <li
            key={item.href}
            className={pathname === item.href ? styles.activeLink : ''}
          >
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
