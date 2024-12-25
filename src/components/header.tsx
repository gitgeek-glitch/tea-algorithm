'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    <header className="bg-[#1e2530] border-b border-gray-700 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TEA
        </Link>
        <ul className="flex space-x-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link 
                href={href} 
                className={`hover:text-gray-300 ${pathname === href ? 'text-white' : 'text-gray-400'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header