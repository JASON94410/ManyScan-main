import localFonts from 'next/font/local';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from './auth/authContext';



const ArialBlack = localFonts({
    src: '../../public/fonts/ArialBlack.ttf',
    display: 'swap',
    variable: '--font-arial-black',
});

export default function App({ Component, pageProps }: AppProps) {
    return (

    
    
        <AuthProvider>
        <main className={ArialBlack.className}>
            <Component {...pageProps} />
        </main>
        </AuthProvider>
   
        
    );

}
