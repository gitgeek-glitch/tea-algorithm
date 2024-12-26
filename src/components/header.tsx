'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Header = () => {
  const pathname = usePathname()
  
  const links = [
    { href: '/encryption', label: 'Encryption' },
    { href: '/decryption', label: 'Decryption' },
    { href: '/code', label: 'Code' },
    { href: '/algorithm', label: 'Algorithm' },
    { href: '/pseudocode', label: 'Pseudocode' },
  ]

  return (
    <header className="bg-[#1e2530] border-b border-gray-700 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TEA Algorithm
        </Link>
        <ul className="flex space-x-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="relative">
                <span className={`hover:text-gray-300 ${pathname === href ? 'text-white' : 'text-gray-400'}`}>
                  {label}
                </span>
                {pathname === href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    layoutId="underline"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header