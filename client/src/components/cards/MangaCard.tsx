import React from 'react';
import AnimeObjects from '../../interfaces/animeObjects';
import Cover from '../../components/Cover';
import StarRating from '../../components/svg/StarRating';

interface Props {
    manga: AnimeObjects;
    index?: number;
    size: string;
    parentDiv: string;
    childDiv?: string;
    titleDiv?: string;
    titleCSS?: string;
    ratingDiv: string;
}

const MangaCard: React.FC<Props> = ({
    manga,
    index,
    size,
    parentDiv,
    childDiv,
    titleDiv,
    titleCSS,
    ratingDiv,
}) => {
    return (
        <div key={manga.id || index} className={parentDiv}>
            <Cover manga={manga} size={size} />
            <div className={childDiv}>
                <div className={titleDiv}>
                    <h3
                        className={`${titleCSS} line-clamp-2 overflow-hidden overflow-ellipsis`}>
                        {manga.title ?? 'Titre inconnu'}
                    </h3>
                    <p className='font-regular text-xs text-element-primary'>
                        {manga.authorName ?? 'Auteur inconnu'}
                    </p>
                </div>
                <div className={`${ratingDiv} flex items-center`}>
                    <span className='text-sm'>
                        <StarRating
                            rating={manga.statistics.rating}
                            mangaId={manga.id}
                        />
                    </span>
                    <span className='text-xs text-element-primary'>
                        {manga.statistics.numberOfVotes ?? '0'} votes
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MangaCard;
