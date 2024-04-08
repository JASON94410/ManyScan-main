'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TopAnimeCard from '../components/cards/TopMangaCard';
import DiscoverAnimeCard from '../components/cards/DiscoverMangaCard';
import NewAnimeCard from '../components/cards/NewMangaCard';
import TopVerticalAnimeCard from '../components/cards/TopVerticalMangaCard';
import { fetchManga } from '../services/MangaTheqApi';
import AnimeObjects from '../interfaces/animeObjects';
import Footer from '../components/Footer';
import React from 'react';

export default function Home() {
    const [mangas, setAnimes] = useState<AnimeObjects[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const mangaData = await fetchManga(1, 20);
            setAnimes(mangaData || []);
        };
        loadData();
    }, []);

    const topRatedManga = mangas.sort(
        (a, b) => b.statistics.rating - a.statistics.rating
    );
    const randomManga = mangas[Math.floor(Math.random() * mangas.length)];
    const newManga = mangas.sort((a, b) => b.createdAt - a.createdAt);
    const topRatedMangaVertical = mangas.sort(
        (a, b) => b.statistics.rating - a.statistics.rating
    );

    return (
        <div className='py-6 bg-background-primary dark:bg-dark-background-secondary'>
            <Header />
            <div className='lg:flex lg:flex-row gap-10 mx-24 my-10'>
                <div className='lg:w-3/4'>
                    <div className='lg:flex lg:flex-row gap-10'>
                        {mangas.length > 0 && (
                            <div className='w-full lg:w-3/4'>
                                <TopAnimeCard manga={topRatedManga[0]} />
                            </div>
                        )}
                        {mangas.length > 1 && (
                            <div className=' lg:w-1/3'>
                                <DiscoverAnimeCard manga={randomManga} />
                            </div>
                        )}
                    </div>
                    <div className='w-full mt-7'>
                        <NewAnimeCard mangas={newManga} />
                    </div>
                </div>
                <div className='lg:w-1/4'>
                    <TopVerticalAnimeCard
                        mangas={topRatedMangaVertical.slice(0, 10)}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
