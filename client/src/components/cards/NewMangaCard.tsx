'use client';

import React from 'react';
import CardTitle from './CardTitle';
import AnimeObjects from '../../interfaces/animeObjects';
import MangaCard from './MangaCard';
import CardsContainer from './CardsContainer';

interface Props {
    mangas: Array<AnimeObjects>;
}

const NewAnimeList: React.FC<Props> = ({ mangas }) => {
    return (
        <div className=''>
            <CardTitle title='Nouveautés' />
            <CardsContainer tailwindClass='scrollbar-thin overflow-auto flex flex-row space-x-10 p-6'>
                {mangas.slice(0, 7).map((manga, index) => (
                    <MangaCard
                        manga={manga}
                        index={index}
                        key={manga.id}
                        size='large'
                        parentDiv='flex flex-col items-start'
                        titleDiv='my-2'
                        ratingDiv='flex items-center'
                    />
                ))}
            </CardsContainer>
        </div>
    );
};

export default NewAnimeList;
