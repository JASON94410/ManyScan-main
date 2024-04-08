'use client';

import CardTitle from './CardTitle';
import MangaObjects from '../interfaces/mangaObjects';
import StarRating from '../components/svg/StarRating';
import Cover from '../components/Cover';
import Link from 'next/link';


interface Props {
    mangas: MangaObjects;
}

const DiscoverMangaCard: React.FC<Props> = ({ mangas }) => {
    return (
        <div className='w-full h-full p-5'>
    <CardTitle title='Découvrir' />
    <div className='w-full h-84 text-center rounded-md border-2 border-red-500 dark:bg-dark-card bg-white p-5 '>
    <Link key={mangas.id} href={`/animes/${mangas.id}`}>
        <Cover manga={mangas} width={150} height={200} />
        </Link>
        <div className='flex justify-between w-[90%] mx-auto'>
            <div className='flex flex-col items-start w-[85%]'>
                <h3 className='font-semibold text-start text-lg text-dark line-clamp-2 overflow-hidden overflow-ellipsis'>
                    {mangas.title ?? 'Titre'}
                </h3>
                <p className='font-regular text-xs text-dark text-start'>
                    {mangas.authorName ?? 'Auteur'}
                </p>
            </div>
            <div className='flex flex-col items-center overflow-ellipsis'>
                <span className='text-sm text-dark'>
                    <StarRating
                        rating={mangas.statistics.rating}
                        mangaId={mangas.id}
                    />
                    {mangas.statistics.numberOfVotes ?? '0'} votes
                </span>
            </div>
        </div>
    </div>
</div>

    );
};

export default DiscoverMangaCard;
