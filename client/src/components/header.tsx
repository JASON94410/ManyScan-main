'use client'; // Nécéssaire pour pouvoir utiliser onChangeHandler

import { useTheme } from 'next-themes';
import AppLogo from './svg/AppLogo';
import Navigation from './Navigations';
import Toggle from './ToggleDarkMode';
import Separation from './svg/Separation';
import SearchByTitle from './SearchByTitle';
import Kumo from './svg/Kumo';

export default function Header() {
    const { systemTheme, theme, setTheme } = useTheme();

    return (
        <header className='flex flex-row justify-evenly'>
            <div>
                <AppLogo />
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between items-center h-2/3 pr-8'>
                    <SearchByTitle />
                    <Navigation />
                    <Toggle
                        value={false}
                        onChangeHandler={(value: boolean) => {
                            if (theme == 'dark') {
                                setTheme('light');
                            } else {
                                setTheme('dark');
                            }
                            console.log(value);
                        }}
                        label='Dark mode'
                    />
                </div>
                <div className='flex flex-row items-center h-1/3'>
                    <Separation />
                    <Kumo />
                </div>
            </div>
        </header>
    );
}
