'use client';

import CardTitle from './CardTitle';
import MangaObjects from '../interfaces/mangaObjects';
import StarRating from '../components/svg/StarRating';
import Cover from '../components/Cover';
import Link from 'next/link';

interface Props {
    mangas: Array<MangaObjects>;
}

const TopMangaCard: React.FC<Props> = ({mangas }) => {
    return (
        <div className='ml-28 p-5'>
    <CardTitle title='Nouveautés' />
    <div className='scrollbar-thin overflow-auto hide-scrollbar rounded-md border-2 border-red-500 dark:bg-dark-card bg-white p-5 dark:border-black flex flex-row space-x-4'>
        {mangas.slice(0, 7).map((manga, index) => {
            return (
                <div key={manga.id || index} className='w-[190px]'>
                    <div className='flex flex-col items-center text-center'>
                    <Link key={manga.id} href={`/mangas/${manga.id}`}>
                    <div className="w-44 h-64 overflow-hidden">
                                <Cover manga={manga} width={150} height={200} />
                            </div>
                            </Link>
                        <h3 className='font-semibold text-lg text-dark line-clamp-2 overflow-hidden overflow-ellipsis'>
                            {manga.title ?? 'Titre inconnu'}
                        </h3>
                        <p className='font-regular text-xs text-dark'>
                            {manga.authorName ?? 'Auteur inconnu'}
                        </p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-sm text-dark'>
                            <StarRating
                                rating={manga.statistics.rating}
                                mangaId={manga.id}
                            />
                        </span>
                        <span className='text-dark text-xs'>
                            {manga.statistics.numberOfVotes ?? '0'} votes
                        </span>
                    </div>
                </div>
            );
        })}
    </div>
</div>

    );
};

export default TopMangaCard;
