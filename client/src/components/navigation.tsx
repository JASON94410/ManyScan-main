'use client'
import Link from 'next/link'
import Padlock from './svg/Padlock'
import Heart from './svg/Heart'
import Book from './svg/Book'
import { useAuth } from '../pages/auth/authContext'
import { getCookie } from 'cookies-next'



export default function Navigation() {

    const { user, logout } = useAuth();
    const username = user?.username || getCookie('username') || '';
    const userRole = getCookie('role') || '';

    return (
      <nav className='flex flew-row justify-between items-center gap-6 text-element-secondary'>
      <Link href='/allmangas' className='flex items-center px-6 gap-1'>
          <Book />
          Tous les mangas
      </Link>
      <Link href='/collection' className='flex items-center px-4 gap-1'>
          <Heart />
          Ma collection
      </Link>
      <div className='flex items-center justify-between px-3 gap-2 rounded-3xl bg-background-secondary border-4  border-element-secondary'>
          <Padlock />
          <div>

          {user ? (
<>
<span className="">{username}</span>&nbsp;
<button onClick={logout} className="">
Déconnexion
</button>
{userRole === "Admin" && (
<>
  <Link href="/dashboard" className='flex items-center px-4 gap-1'>
    Dashboard
  </Link>
</>
)}
</>
) : (
<>
<Link href="/auth/login">
Connexion
</Link>
<span> / </span>
<Link href="/auth/register">
Inscription
</Link>
</>
)}

          </div>
      </div>

  </nav>
)
}

