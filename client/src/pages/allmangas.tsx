'use client';
import React, { useEffect, useState } from 'react';
import { fetchManga } from '../services/MangaTheqApi';
import MangaObjects from '../interfaces/mangaObjects';
import StarRating from '../components/svg/StarRating';
import Pagination from '../components/Pagination';
import Cover from '../components/Cover';
import Link from 'next/link';
import Header from '@/components/header';

import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as mangaApi from '../services/MangaTheqApi';

const AllMangas = () => {
    const [mangas, setMangas] = useState<MangaObjects[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const MANGAS_PER_PAGE = 20;

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const loadData = async () => {
            const mangaData = await fetchManga(currentPage, MANGAS_PER_PAGE);
            setMangas(mangaData || []);
        };

        loadData();
    }, [currentPage]);

    const toggleFavorite = async (mangaId: string) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(mangaId)) {
                newFavorites.delete(mangaId);
            } else {
                newFavorites.add(mangaId);
            }
            return newFavorites;
        });

        // Si vous souhaitez également mettre à jour les favoris côté serveur
        await mangaApi.addToFavorite(mangaId);
    };

    return (
        <div className='py-6'>
            <Header />
            <h1 className='text-3xl font-semibold text-center text-gray-900'>
                Tout les mangas
            </h1>

            <div className='flex flex-wrap justify-center mx-2'>
                {mangas.map((manga) => (
                        <div key={manga.id} className='m-4 cursor-pointer'>
                            <div className='flex flex-col justify-center items-center w-60 h-96 text-center rounded-md bg-white border-2 border-red-500 shadow-lg'>
                            <Link key={manga.id} href={`/mangas/${manga.id}`}>    
                            <div className="w-44 h-64 overflow-hidden">
                                <Cover manga={manga} width={176} height={250} />
                            </div>
                            </Link>
                                <div className='flex justify-between w-[80%] mt-3 pl-2'>
                                    <div className='flex flex-col items-start w-[90%]'>
                                        <h3 className='font-semibold text-start text-lg text-gray-900 line-clamp-2 overflow-hidden overflow-ellipsis'>
                                            {manga.title ?? 'Titre'}
                                        </h3>
                                        <p className='font-regular text-xs text-gray-900 text-start'>
                                            {manga.authorName ?? 'Auteur'}
                                        </p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <span className='text-sm text-gray-900'>
                                            <StarRating
                                                rating={manga.statistics.rating}
                                                mangaId={manga.id}
                                            />
                                            {manga.statistics.numberOfVotes ??
                                                '0'}{' '}
                                            votes
                                        </span>
                                        <div onClick={() => toggleFavorite(manga.id)}>
                                        {favorites.has(manga.id) ? <FaHeart /> : <FaRegHeart />}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                ))}
            </div>
            <Pagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
            />
        </div>
    );
};

export default AllMangas;
