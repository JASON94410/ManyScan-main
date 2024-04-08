
'use client';
import Link from 'next/link';
import Padlock from './svg/Padlock';
import Heart from './svg/Heart';
import Book from './svg/Book';

export default function Navigation() {
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
                <Link href='/auth/login' className=''>
                    Connexion
                </Link>
                <span className=''> / </span>
                <Link href='/auth/register' className=''>
                    Inscription
                </Link>
                </div>
            </div>
            
        </nav>
    );
}
