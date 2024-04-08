import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const SearchByTitle = () => {

    const { systemTheme, theme, setTheme } = useTheme();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([])

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(value)}`);
            const data = await response.json();
            console.log("API Response:", data);
            if (data.result === "ok" && Array.isArray(data.data)) {
                setSearchResults(data.data); // Mettez à jour avec le tableau de résultats
            } else {
                setSearchResults([]); // Réinitialisez si la réponse n'est pas ce qui est attendu
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        console.log("Form submitted with searchTerm:", searchTerm);
    };

    const navigateToMangaDetail = (mangaId: string) => {
        router.push(`/animes/${mangaId}`);
    };
    
    return (
        <form className='flex'>
            <div className="relative">
                <input
                    type='text'
                    className='w-64 bg-element-secondary placeholder:text-background-primary text-background-secondary font-sans font- rounded-3xl py-2 px-4 m-2 text-dark font-light outline-none'
                    placeholder='Rechercher...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="absolute top-3 right-6 ">
                    <button type='submit' className=''>
                        <svg
                            className='fill-background-primary'
                            xmlns='http://www.w3.org/2000/svg'
                            x='0px'
                            y='0px'
                            width='25'
                            height='32'
                            viewBox='0 0 50 50'>
                            <path d='M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z'></path>
                        </svg>
                    </button>
                </div>
                {searchResults.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
                        {searchResults.map((manga) => (
                            <a
                                key={manga.id}
                                onClick={() => navigateToMangaDetail(manga.id)}
                                className='block p-2 hover:bg-gray-100'
                            >
                                {manga.attributes.title.en}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchByTitle;
