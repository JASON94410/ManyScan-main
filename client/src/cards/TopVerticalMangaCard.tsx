'use client';

import CardTitle from './CardTitle';
import MangaObjects from '../interfaces/mangaObjects';
import Star from '../components/svg/StarRating';
import Cover from '../components/Cover';
import Link from 'next/link';

interface Props {
    mangas: MangaObjects[];
    title: string;
}

export default function TopVerticalMangaCard(props: Props) {
    return (
        <div className='pr-20 p-5'>
    <CardTitle title='Top' />
    <div className='scrollbar-thin overflow-auto hide-scrollbar overflow-x-hidden w-full h-full min-h-screen max-h-screen rounded-md bg-white border-2 border-red-500 p-5 flex flex-col space-y-4 '>
        {props.mangas.map((manga, index) => {
            return (
                <div
                    key={manga.id || index}
                    className='text-start flex items-start space-x-2 p-2 h-44 bg-white rounded shadow-md'>
                         <Link key={manga.id} href={`/mangas/${manga.id}`}>
                    <div className='min-w-max min-h-max'>
                        <Cover manga={manga} width={100} height={150} />
                    </div>
                        </Link>
                    <div className='w-full flex flex-col justify-between h-[150px]'>
                        <h3 className='font-semibold text-sm text-gray-900 line-clamp-3 overflow-hidden overflow-ellipsis'>
                            {manga.title ?? 'Titre inconnu'}
                        </h3>
                        <p className='font-regular text-xs text-gray-600 align-start'>
                            {manga.authorName ?? 'Auteur inconnu'}
                        </p>
                        <p className='font-regular text-xs text-gray-600 align-start'>
                            {manga.type ?? 'Type inconnu'}
                        </p>

                        <div className='flex flex-col items-end'>
                            <span className='text-sm text-gray-900'>
                                <Star
                                    rating={manga.statistics.rating ?? 0}
                                    mangaId={manga.id}
                                />
                            </span>
                            <span className='text-gray-600 text-xs'>
                                {manga.statistics?.numberOfVotes ?? '0'} votes
                            </span>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
</div>
    );

}
